from flask import Flask, flash, request, redirect, url_for, render_template, jsonify
from flask_cors import CORS, cross_origin
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from sqlalchemy.inspection import inspect   



#----- Database setup ------#

Base = automap_base()
engine = create_engine('postgresql+psycopg2://postgres:0\@192.168.1.103/postgres')
Base.prepare(autoload_with=engine)

Hall_manager = Base.classes.hall_manager
Host = Base.classes.host
Event = Base.classes.event
Hall = Base.classes.hall
Guest = Base.classes.guest
Invite = Base.classes.invite


app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
#----- CRUD API ------#

my_entities ={'host':Host,'hall':Hall,'manager':Hall_manager,'guest':Guest,'event':Event,'invite':Invite}

@app.route('/create/<entity>', methods=['POST'])
@cross_origin()
def create_db_row(entity):
    new = my_entities[entity](**request.json)
    session = Session(engine)
    session.add(new)
    session.commit()
    pk = inspect(new).identity[0]
    if entity == "event":  # to issue invites depending on the capacity of the hall
        
        my_event = session.query(Event).get(pk)
        my_hall = session.query(Hall).get(my_event.hall_id)
        for i in range(my_hall.capacity):
            new2 = Invite(**{"event_id":my_event.id})
            session.add(new2)
        session.commit()
        

    session.close()
    return get_db_row(entity,pk)


@app.route('/edit/<entity>', methods=['POST'])
def edit_db_row(entity):
    session = Session(engine)
    session.query(my_entities[entity]).filter(my_entities[entity].id== request.json['id']).update(request.json, synchronize_session = False)
    session.commit()
    session.close()
    return "Edited succesfully"

@app.route('/get/<entity>/<id>')
def get_db_row(entity,id):
    session = Session(engine)
    my_object = session.query(my_entities[entity]).get(id)
    my_object = my_object.__dict__
    my_object.pop('_sa_instance_state', None)

    if entity == "invite":
        my_event = session.query(Event).get(my_object['event_id']).__dict__
        my_event.pop('_sa_instance_state', None)
        my_hall = session.query(Hall).get(my_event['hall_id']).__dict__
        my_hall.pop('_sa_instance_state', None)
        return {"invite":my_object,'event':my_event,'hall':my_hall}
    
    if entity == "event":
        my_object['number_of_accepted_invites']=len(event_guest_list(id))
    session.close()
    return my_object

@app.route('/del/<entity>/<id>', methods=['POST'])
def delete_db_row(entity,id):
    session = Session(engine)
    my_object = session.query(my_entities[entity]).get(id)
    session.delete(my_object)
    session.commit()
    session.close()
    return "Deleted succesfully"

@app.route('/halls')
def get_halls():
    session = Session(engine)
    my_object = session.query(Hall).all()
    all_halls={}
    i=0
    for hall in my_object:
        hall=hall.__dict__
        hall.pop('_sa_instance_state', None)
        all_halls[i]=hall
        i+=1
    session.close()
    return all_halls

@app.route('/eventguestlist/<id>')
def event_guest_list(id):
    session = Session(engine)
    event_invites = session.query(Invite).filter(Invite.event_id==id).all()
    i=0
    all_guests={}
    for invite in event_invites:
        invite=invite.__dict__
        invite.pop('_sa_instance_state', None)
        the_guest = session.query(Guest).filter(Guest.invite_code==invite['code']).first()
        if the_guest:
            the_guest=the_guest.__dict__
            the_guest.pop('_sa_instance_state', None)
            all_guests[i]={'invite':invite, 'guest':the_guest}
            i+=1
    session.close()
    return all_guests

@app.route('/hallevents/<id>')
def hall_events(id):
    session = Session(engine)
    hall_events = session.query(Event).filter(Event.hall_id==id).all()
    i=0
    all_events={}
    for event in hall_events:
        event=event.__dict__
        event.pop('_sa_instance_state', None)
        the_hall=get_db_row('hall',id)
        all_events[i]={'hall':the_hall, 'event':event}
        i+=1
    session.close()
    return all_events

@app.route('/firstinvite/<id>')
def event_first_invite(id):
    session = Session(engine)
    first_invite = session.query(Invite).filter(Invite.event_id==id).order_by(Invite.code).first().code
    last_invite = session.query(Invite).filter(Invite.event_id==id).order_by(Invite.code.desc()).first().code

    session.close()
    return [first_invite,last_invite]

@app.route('/')
def home():
    return "1"

if __name__ == "__main__":
    app.run(host='0.0.0.0', port= 5557)