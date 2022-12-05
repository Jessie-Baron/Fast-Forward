from app.models import db, User, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        first_name='Demo', last_name='User', username='Demo', bio='This is a test User', image_url='https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', email='demo@aa.io', password='password')
    marnie = User(
        first_name='Marnie', last_name='Rodriguez', username='marnie',  bio='virgo <3', image_url='https://i.etsystatic.com/36532523/r/il/97ae46/4078306713/il_340x270.4078306713_n74s.jpg', email='marnie@aa.io', password='password')
    bobbie = User(
        first_name='Bobbie', last_name='Smiths', image_url='https://static-cse.canva.com/blob/951359/1600w-YTfEMXMuMCs.jpg', bio='Creator from South Georgia! Roll Tide!', username='bobbie', email='bobbie@aa.io', password='password')
    Bella = User(
        first_name='Bella', last_name='Poarch', image_url='https://p16-sign.tiktokcdn-us.com/tos-useast5-avt-0068-tx/673f78c28ed852aa8c3d97c43d8f1694~c5_720x720.jpeg?x-expires=1670414400&x-signature=Z7%2BTbckHy%2BCdQHzOZiOkBfH4owQ%3D', bio='No bio yet.', username='bellapoarch', email='bella@aa.io', password='password')
    Will = User(
        first_name='Will', last_name='Smith', image_url='https://p16-sign-va.tiktokcdn.com/musically-maliva-obj/1646315618666501~c5_720x720.jpeg?x-expires=1670320800&x-signature=ZgZpdSsT3%2FOh0WEvDdWwuBImYlE%3D', username='willsmith', email='will@aa.io', password='password')
    Zach = User(
        first_name='Zach', last_name='King', image_url='https://p16-sign-sg.tiktokcdn.com/aweme/720x720/tos-alisg-avt-0068/smgf5f369c884044a8df770614bbfd64717.jpeg?x-expires=1670407200&x-signature=z9iJnn8lqdmF0N32trwD9TkMdFE%3D', username='zachking', email='zach@aa.io', password='password')
    Khaby = User(
        first_name='Khabane', last_name='Lame', image_url='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDOE1dBmDsBMGigsXAgt8Udrc4e7oKJoik6A&usqp=CAU', username='khaby.lame', email='khaby@aa.io', password='password')
    Rock = User(
        first_name='The', last_name='Rock', image_url='https://p16-sign-va.tiktokcdn.com/musically-maliva-obj/1647596478025734~c5_720x720.jpeg?x-expires=1670382000&x-signature=%2B2pnSN4gsBZa6geUiDvVTvfPNQw%3D', username='therock', email='rock@aa.io', password='password')



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
