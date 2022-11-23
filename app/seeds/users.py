from app.models import db, User, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        first_name='Demo', last_name='User', username='Demo', bio='This is a test User', image_url='https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', email='demo@aa.io', password='password')
    marnie = User(
        first_name='marnie', last_name='Rodriguez', username='marnie',  bio='virgo <3', image_url='https://i.etsystatic.com/36532523/r/il/97ae46/4078306713/il_340x270.4078306713_n74s.jpg', email='marnie@aa.io', password='password')
    bobbie = User(
        first_name='Bobbie', last_name='Smith', image_url='https://static-cse.canva.com/blob/951359/1600w-YTfEMXMuMCs.jpg', bio='Creator from South Georgia! Roll Tide!', username='bobbie', email='bobbie@aa.io', password='password')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
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
