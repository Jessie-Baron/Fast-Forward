from app.models import db, FastForward, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_fast_forwards():
    ff1 = FastForward(
        user_id=4, url='https://jessie-projects.s3.amazonaws.com/51069aed6aa0451088ebe0b976d3dc11.mp4', caption='In my active era✨')
    ff2 = FastForward(
        user_id=4, url='https://jessie-projects.s3.amazonaws.com/8c23ae438e514b4a8ab0157931ec9240.mp4', caption='I want to go to Brazil😌')
    ff3 = FastForward(
        user_id=4, url='https://jessie-projects.s3.amazonaws.com/a68f0f7ee195450c957b5d42e82f7eab.mp4', caption='Let’s make lemonade🍋')
    ff4 = FastForward(
        user_id=4, url='https://jessie-projects.s3.amazonaws.com/e13af6003a4e44889fd194e265ddb060.mp4', caption='It’s always an honor. Thank you to the queen @Rihanna for having me back😌🖤 Nov 9th #SAVAGEXFENTYSHOW')
    ff5 = FastForward(
        user_id=4, url='https://jessie-projects.s3.amazonaws.com/932f5b04220b424cb9e510eaff1182a8.mp4', caption='A behind the scenes look at my #MADDENWOOD dreamworld✨ Want to join? Link in bio to shop!')
    ff6 = FastForward(
        user_id=5, url='https://jessie-projects.s3.amazonaws.com/d3ea7f2128e44f4c8e4d1bff6e41c0b0.mp4', caption='You’re in his DMs. I’m shooting his slo mo walks. We are different. Inspo: @Max Goodrich')
    ff7 = FastForward(
        user_id=5, url='https://jessie-projects.s3.amazonaws.com/a8b8592b37b34b6a90378e8c8491d752.mp4', caption='Y’all know what I’m talkin bout')
    ff8 = FastForward(
        user_id=5, url='https://jessie-projects.s3.amazonaws.com/b0d96e621b9a4281a4092aaea4c808ea.mp4', caption='I went viral')
    ff9 = FastForward(
        user_id=5, url='https://jessie-projects.s3.amazonaws.com/9a6ac3e03d3a461fb78e46ee9972aab3.mp4', caption='Sorry')
    ff10 = FastForward(
        user_id=5, url='https://jessie-projects.s3.amazonaws.com/4f7bc394e65f4e1ba894a4fc7958ad53.mp4', caption='I got one answer to every question')
    ff11 = FastForward(
        user_id=6, url='https://jessie-projects.s3.amazonaws.com/e0a1da2e75984ab2ad3aba0894882a21.mp4', caption='“Time is an illusion” - Albert Einstein | I traveled to London to shoot this video and as I shot, the first few tales weren’t feeling right, it’s because tourists were still taking photos of #bigben , but that’s when I had an idea. We had a crowd of fans around me as I was shooting. So we asked them to be in the background of the video. So a lot of the people behind me are actually fans on the bridge and when they react to the clock being gone. And bonus, that Bus name in the background was NOT planned! Crazy')
    ff12 = FastForward(
        user_id=6, url='https://jessie-projects.s3.amazonaws.com/ff89011659ce43d9a8c092ee545525bb.mp4', caption='Mad respect for anyone that is a street performer')
    ff13 = FastForward(
        user_id=6, url='https://jessie-projects.s3.amazonaws.com/4f6d83a32d7e4f979e5a8db2b0ceb756.mp4', caption='This trick shot took 127 takes…')
    ff14 = FastForward(
        user_id=6, url='https://jessie-projects.s3.amazonaws.com/3b94ac3ab41d4ea893141b9fcd68efb5.mp4', caption='Stay hydrated')
    ff15 = FastForward(
        user_id=6, url='https://jessie-projects.s3.amazonaws.com/73ce990e98264130ac386b62ea0e6814.mp4', caption='When your #bereal notification goes off')
    ff16 = FastForward(
        user_id=7, url='https://jessie-projects.s3.amazonaws.com/ef22e170d33341f8987830d9c6bd00d0.mp4', caption='Who wants to ⚡️go⚡️to McDonald’s with me after the game today? #ad @mcdonalds')
    ff17 = FastForward(
        user_id=7, url='https://jessie-projects.s3.amazonaws.com/99066599783245de944a6f2d637cfb08.mp4', caption='#BinanceMan is back to ease you into your Web3 journey with @binance 🤲🏾')
    ff18 = FastForward(
        user_id=7, url='https://jessie-projects.s3.amazonaws.com/78c499e08ef441eca6fdcadd69f43cd4.mp4', caption='Singer vs Producer + Mom Part 4* 🤣 (🇺🇸 Jersey)what’s next… #learnfromkhaby #learnontiktok @TikTok @tiktok creators #drake')
    ff19 = FastForward(
        user_id=7, url='https://jessie-projects.s3.amazonaws.com/6d81c678cd09476a921fd9a0a2d19b23.mp4', caption='#KhabyChallenge!🤣 Let’s do it and mention me!😛I wanna see you all doing that #learnfromkhaby #learnontiktok @TikTok @tiktok creators @_christlike')
    ff20 = FastForward(
        user_id=7, url='https://jessie-projects.s3.amazonaws.com/eef8dcb166cb43e7b47aea7d2685e223.mp4', caption='Let’s see if you guys can DUET with me!! I love the new #Pixel7! I will repost all duets with me on my iG Stories🤯 @googlepixel #BroughttoyoubyGoogle #teampixel')
    ff21 = FastForward(
        user_id=8, url='https://jessie-projects.s3.amazonaws.com/b73bbf49e3464dc0b003e60e2d34a38c.mp4', caption='Here comes Dwanta Claus, right down Dwanta Claus laaaaane 🎶 🥃🎅🏾🛷 Your GREATEST CHEAT MEAL AWAITS - hit my bio NOW and enjoy 😈🍨 @Salt & Straw #teremana')
    ff22 = FastForward(
        user_id=8, url='https://jessie-projects.s3.amazonaws.com/e5e4468622c84b0ab2fd0f28d75c7757.mp4', caption='I’m the kind of guy who faces his demons… even the chocolate ones 🍫😈😂 Stealing Snickers bars + 7-11 + every day for a year = time to go back home and right the wrong 🤣🙋🏽‍♂️ Plus, it’s cheaper than a shrink 🤙🏾🥃😉')
    ff23 = FastForward(
        user_id=8, url='https://jessie-projects.s3.amazonaws.com/7ea3d33813fe4fc8877f46d7a09567d1.mp4', caption='COUNTDOWN 📅 IS OVER AND BLACK ADAM⚡️ IS IN THEATERS TONIGHT!!!! Get your tickets NOW & enjoy! And make sure you stay til the end and prepare for the eruption…. 🌋🤯😉')
    ff24 = FastForward(
        user_id=8, url='https://jessie-projects.s3.amazonaws.com/9f6d99e04deb4883b630d54ffe96d482.mp4', caption='Always good to see my brotha @imkevinhart aka #HonkyPete in the house - rocking his AMAZING mini-me #BlackAdam Halloween costume this year. I just get annoyed when he doesnt give me direct answers 😂👏🏾 GET YOUR BLACK ADAM ⚡️TICKETS NOW… In theaters OCTOBER 21st🌎')
    ff25 = FastForward(
        user_id=8, url='https://jessie-projects.s3.amazonaws.com/45bfbf8d8d3246a4a468570a580b6eb5.mp4', caption='Girl dads ROCK😉💪🏾 Her father was emotional as he handed me his beautiful baby. Whatever this moment meant to him, meant something special to me too. #BlackAdamWorldTour #MexicoCity')
    ff36 = FastForward(
        user_id=1, url='https://cdn.coverr.co/videos/coverr-a-girl-shooting-a-video-of-a-christmas-tree-at-the-fair-2532/1080p.mp4', caption='A girl shooting a video of a Christmas tree at the fair')
    ff37 = FastForward(
        user_id=1, url='https://cdn.coverr.co/videos/coverr-a-girl-smelling-a-christmas-tree-at-the-fair-1013/1080p.mp4', caption='A girl smelling a Christmas tree at the fair')
    ff38 = FastForward(
        user_id=1, url='https://cdn.coverr.co/videos/coverr-a-girl-looking-at-christmas-decorations-while-at-the-fair-3207/1080p.mp4', caption='A girl looking at Christmas decorations while at the fair')
    ff39 = FastForward(
        user_id=2, url='https://cdn.coverr.co/videos/coverr-christmas-decorations-4223/1080p.mp4', caption='Christmas decorations')
    ff40 = FastForward(
        user_id=2, url='https://cdn.coverr.co/videos/coverr-a-girl-taking-a-stroll-at-a-festive-fair-4511/1080p.mp4', caption='A girl taking a stroll at a festive fair')
    ff41 = FastForward(
        user_id=2, url='https://cdn.coverr.co/videos/coverr-christmas-stockings-5285/1080p.mp4', caption='Christmas stockings')
    ff42 = FastForward(
        user_id=3, url='https://cdn.coverr.co/videos/coverr-christmas-ornaments-8497/1080p.mp4', caption='Christmas ornaments')
    ff43 = FastForward(
        user_id=3, url='https://cdn.coverr.co/videos/coverr-a-girl-walking-around-at-the-fair-6858/1080p.mp4', caption='A girl walking around at the fair')
    ff44 = FastForward(
        user_id=3, url='https://cdn.coverr.co/videos/coverr-a-happy-girl-smiling-for-the-camera-8696/1080p.mp4', caption='A happy girl smiling for the camera')

    db.session.add(ff1)
    db.session.add(ff2)
    db.session.add(ff3)
    db.session.add(ff4)
    db.session.add(ff5)
    db.session.add(ff6)
    db.session.add(ff7)
    db.session.add(ff8)
    db.session.add(ff9)
    db.session.add(ff10)
    db.session.add(ff11)
    db.session.add(ff12)
    db.session.add(ff13)
    db.session.add(ff14)
    db.session.add(ff15)
    db.session.add(ff16)
    db.session.add(ff17)
    db.session.add(ff18)
    db.session.add(ff19)
    db.session.add(ff20)
    db.session.add(ff21)
    db.session.add(ff22)
    db.session.add(ff23)
    db.session.add(ff24)
    db.session.add(ff25)
    db.session.add(ff36)
    db.session.add(ff37)
    db.session.add(ff38)
    db.session.add(ff39)
    db.session.add(ff40)
    db.session.add(ff41)
    db.session.add(ff42)
    db.session.add(ff43)
    db.session.add(ff44)
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
