from app.models import db, FastForward, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_fast_forwards():
    ff1 = FastForward(
        user_id=1, url='https://static.videezy.com/system/resources/previews/000/008/445/original/Dark_Haired_Girl_in_disbelief_1.mp4', caption='test1')
    ff2 = FastForward(
        user_id=1, url='https://static.videezy.com/system/resources/previews/000/000/168/original/Record.mp4', caption='test2')
    ff3 = FastForward(
        user_id=1, url='https://static.videezy.com/system/resources/previews/000/008/302/original/Dark_Haired_Girl_angry_-what-!-_1.mp4', caption='test3')
    ff4 = FastForward(
        user_id=2, url='https://static.videezy.com/system/resources/previews/000/008/452/original/Dark_Haired_Girl_Pensive_Looks_at_Camera.mp4', caption='test4')
    ff5 = FastForward(
        user_id=2, url='https://static.videezy.com/system/resources/previews/000/042/042/original/Ramdom_Lines_x264.mp4', caption='test5')
    ff6 = FastForward(
        user_id=2, url='https://static.videezy.com/system/resources/previews/000/045/482/original/20_14_02.mp4', caption='test6')
    ff7 = FastForward(
        user_id=3, url='https://static.videezy.com/system/resources/previews/000/038/653/original/alb_glitch1047_1080p_24fps.mp4', caption='test7')
    ff8 = FastForward(
        user_id=3, url='https://static.videezy.com/system/resources/previews/000/044/249/original/01__2822_29.mp4', caption='test8')
    ff9 = FastForward(
        user_id=3, url='https://static.videezy.com/system/resources/previews/000/044/903/original/telepoorte_fnl.mp4', caption='test9')
        
    db.session.add(ff1)
    db.session.add(ff2)
    db.session.add(ff3)
    db.session.add(ff4)
    db.session.add(ff5)
    db.session.add(ff6)
    db.session.add(ff7)
    db.session.add(ff8)
    db.session.add(ff9)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_fast_forwards():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.fastForwards RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM fastForwards")

    db.session.commit()
