from app.models import db, User, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        first_name='Demo', last_name='User', username='Demo', bio='This is a test User', image_url='https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg', email='demo@aa.io', password='password')
    marnie = User(
        first_name='Marnie', last_name='Rodriguez', username='marnie',  bio='virgo <3', image_url='https://i.etsystatic.com/36532523/r/il/97ae46/4078306713/il_340x270.4078306713_n74s.jpg', email='marnie@aa.io', password='password')
    bobbie = User(
        first_name='Bobbie', last_name='Smiths', image_url='https://static-cse.canva.com/blob/951359/1600w-YTfEMXMuMCs.jpg', bio='Creator from South Georgia! Roll Tide!', username='bobbie', email='bobbie@aa.io', password='password')
    Bella = User(
        first_name='Bella', last_name='Poarch', image_url='https://editors.dexerto.com/wp-content/uploads/2021/01/BellaPoarchTop5.jpg', bio='No bio yet.', username='bellapoarch', email='bella@aa.io', password='password')
    Will = User(
        first_name='Will', last_name='Smith', image_url='https://media.wired.com/photos/5d960eba01e4a4000826137c/master/pass/Culture_Monitor_WillSmith-465783654.jpg', username='willsmith', email='will@aa.io', password='password')
    Zach = User(
        first_name='Zach', last_name='King', image_url='https://i.guim.co.uk/img/media/4ea36f9ca7d8900fde5957a15d64ecef7180364b/0_1343_4480_2688/master/4480.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=f90a12b25e5d0f30ccbbce7431422d57', username='zachking', email='zach@aa.io', password='password')
    Khaby = User(
        first_name='Khabane', last_name='Lame', image_url='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDOE1dBmDsBMGigsXAgt8Udrc4e7oKJoik6A&usqp=CAU', username='khaby.lame', email='khaby@aa.io', password='password')
    Rock = User(
        first_name='The', last_name='Rock', image_url='https://parade.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTk0NDIzNDY0NzQyODg4OTY1/black-adam-madrid-premiere.jpg', username='therock', email='rock@aa.io', password='password')



    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(Bella)
    db.session.add(Will)
    db.session.add(Zach)
    db.session.add(Khaby)
    db.session.add(Rock)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
