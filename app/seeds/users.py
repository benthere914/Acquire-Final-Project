from app.models import db, User
import random
guy_names = ['Liam','Noah','Oliver','Elijah','William','James','Benjamin','Lucas','Henry','Alexander','Mason','Michael','Ethan','Daniel',
'Jacob','Logan','Jackson','Levi','Sebastian','Mateo','Jack','Owen','Theodore','Aiden','Samuel','Joseph','John','David','Wyatt','Matthew',
'Luke','Asher','Carter','Julian','Grayson','Leo','Jayden','Gabriel','Isaac','Lincoln','Anthony','Hudson','Dylan','Ezra','Thomas','Charles',
'Christopher','Jaxon','Maverick','Josiah','Isaiah','Andrew','Elias','Joshua','Nathan','Caleb','Ryan','Adrian','Miles','Eli','Nolan',
'Christian','Aaron','Cameron','Ezekiel','Colton','Luca','Landon','Hunter','Jonathan','Santiago','Axel','Easton','Cooper','Jeremiah','Angel',
'Roman','Connor','Jameson','Robert','Greyson','Jordan','Ian','Carson','Jaxson','Leonardo','Nicholas','Dominic','Austin','Everett','Brooks',
'Xavier','Kai','Jose','Parker','Adam','Jace','Wesley','Kayden','Silas','Alan','Allan','Allen','Brian','Bryan','Cole','Colin','Collin',
'Conner','Conor','Corey','Cory','Damian','Damien','Damon','Derek','Derrick','Devin','Devon','Dilan','Dillon','Dominick','Dominik',
'Donovan','Dorian','Douglas','Drake','Duke','Dustin','Eric','Erick','Erik','Gary','Gavin','Gunnar' ]

gal_names = ['Olivia','Emma','Ava','Charlotte','Sophia','Amelia','Isabella','Mia','Evelyn','Harper','Camila','Gianna','Abigail','Luna',
'Ella','Elizabeth','Sofia','Emily','Avery','Mila','Scarlett','Eleanor','Madison','Layla','Penelope','Aria','Chloe','Grace','Ellie','Nora',
'Hazel','Zoey','Riley','Victoria','Lily','Aurora','Violet','Nova','Hannah','Emilia','Zoe','Stella','Everly','Isla','Leah','Lillian',
'Addison','Willow','Lucy','Paisley','Natalie','Naomi','Eliana','Brooklyn','Elena','Aubrey','Claire','Ivy','Kinsley','Audrey','Maya',
'Genesis','Skylar','Bella','Aaliyah','Madelyn','Savannah','Anna','Delilah','Serenity','Caroline','Kennedy','Valentina','Ruby','Sophie',
'Alice','Gabriella','Sadie','Ariana','Allison','Hailey','Autumn','Nevaeh','Natalia','Quinn','Josephine','Sarah','Cora','Emery','Samantha',
'Piper','Leilani','Eva','Everleigh','Madeline','Lydia','Jade','Peyton','Brielle','Adeline','Vivian','Rylee','Clara','Raelynn','Melanie',
'Melody','Julia','Athena','Maria','Liliana','Hadley','Arya','Rose','Reagan','Eliza','Adalynn','Kaylee','Lyla','Mackenzie','Alaia',
'Isabelle','Charlie','Arianna','Mary','Remi','Margaret','Iris','Ximena','Eden','Ayla','Kylie','Elliana','Josie','Katherine']

emails = ['gmail', 'hotmail', 'yahoo', 'aa.io']
guy_photos = [
"https://images.generated.photos/G_a7ke2VV4SZ7fcPcRll_4suM0XRImf9d291hYqchoI/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/NTQ4MTc3LmpwZw.jpg"
,"https://images.generated.photos/ZosvZXerZQDg5zlrpoRfN9cZ8kb8Y_3wc2fpBGKnDYI/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/Njg5NjQzLmpwZw.jpg"
,"https://images.generated.photos/tyvIvyi1Z0BON9FyHO5naQGRR0Ya28rtaItK8MJ1Lss/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/MDQxNjUyLmpwZw.jpg"
,"https://images.generated.photos/xd44DoYoYi8LTkG8IhV-ta_lSjKYMqa3eRwjIIkshb4/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/Mjg3ODAwLmpwZw.jpg"
,"https://images.generated.photos/vfzNj9tc_VDdw_6PRlbcvziKLjqtDb6rJgElaJ9KO04/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/MzIzMTMzLmpwZw.jpg"
,"https://images.generated.photos/3f4gshJiyfW4Lp1Svx1grtN4zMDRhJl3tUke5oIE5QM/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/MTcwNTE2LmpwZw.jpg"
,"https://images.generated.photos/_VwTckYuxiLYYkr42lLIj_I0SmMpwpwT6uVPzXGNXb8/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/MDk0NTcwLmpwZw.jpg"
,"https://images.generated.photos/QdCzljjGKCQA-Sz_lpzNqYLK64DRMhC7RhYpWKV4zb8/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/Mjk5ODg4LmpwZw.jpg"
,"https://images.generated.photos/QdCzljjGKCQA-Sz_lpzNqYLK64DRMhC7RhYpWKV4zb8/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/Mjk5ODg4LmpwZw.jpg"
,"https://images.generated.photos/Vnt71-C7QSF6mEaQCu636HMzkxZQp9rUtgQ8dVRKGCs/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/NjAxMzY0LmpwZw.jpg"
,"https://images.generated.photos/kWS1HZnzPpt8L2U0DXIo4JmTjiv6uXh4Ve900NgiwzE/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/NjA3MTg4LmpwZw.jpg"
,"https://images.generated.photos/ydNI7rMvrn9by0_vabILk5nNNspcgrfJQJBrH9JKWMY/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/NzMyNzI2LmpwZw.jpg"
,"https://images.generated.photos/LVd3EA0aZ_sra2vtkZUPGS795uAqIvldYU88bbft2mE/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/MzgyMzczLmpwZw.jpg"
,"https://images.generated.photos/i_gg4c24BifwSYGyO-peUQgKKSVnPgZYLSW8o-qUqO8/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/NTgzMjQyLmpwZw.jpg"
,"https://images.generated.photos/lnC3ionptk5jGL0FUrlyJQaqpRv2fobU5k0LCLZYUek/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/NjIzNTY4LmpwZw.jpg"
,"https://images.generated.photos/9I3oV-CFP6BJ9tieTkhTUZD17EwDh7dNi47dRvYNKUA/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/Njg0NDY2LmpwZw.jpg"
,"https://images.generated.photos/VGie-fMD0L4GQQk96ZhVeJaQCo0m3w3evsFNTbtLjZ4/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/Njk1NDk1LmpwZw.jpg"
,"https://images.generated.photos/9Igz7422KPJbeVORxxG5DLRLLEqgdQixmRuL3roGbdo/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/MjQzMTcxLmpwZw.jpg"
,"https://images.generated.photos/JzqAM_Atmehslb2z0O1zy_tzD-xi67HJYshpbv9Tdf0/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/OTI2NDkzLmpwZw.jpg"
,"https://images.generated.photos/pFVXMwYKZdRsAaPZ1KuZszPcEC2VcV-hi8xwevpa4s8/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/MTM1ODQ3LmpwZw.jpg"
,"https://images.generated.photos/rAxotLwDoi4gjqperpEgw2ms1vUjyxePRds5mMiDNMQ/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/MTkzNzExLmpwZw.jpg"
,"https://images.generated.photos/e3Z_NQZjW_A9PwEoOgY5-o82ktUbOks6r5qlB1j3XVI/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/OTMzODg2LmpwZw.jpg"
]

gal_photos = [

"https://images.generated.photos/1BhP0vukSZCcUSe8VSklano1dsL1VeXnP2wEhsCA-vY/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/NjIyMTIwLmpwZw.jpg"
,"https://images.generated.photos/MywTg2y25CpcgwytvS3T4KPLvmqQemhyt4rzp1w4iSM/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/ODQ3MTExLmpwZw.jpg"
,"https://images.generated.photos/QB9VllKYoikg2TN2Z1gfWASLnJz7NUFufhR36GEkqow/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/OTE2MzcyLmpwZw.jpg"
,"https://images.generated.photos/I3FvPN5zkmlollmEO58qSb8fVMsCz0dkQr7QuuRgWWk/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/MDA2NDgyLmpwZw.jpg"
,"https://images.generated.photos/exN7fftI4hhOnagN63j2RvZXIS3-Ps6qf5teGWB3BNA/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/MTg1NDEyLmpwZw.jpg"
,"https://images.generated.photos/ZZ2ca2M1bztsT_SRLxp0DxHYP2bA3zb9ZRTiTSH_18o/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/NzY4NzUyLmpwZw.jpg"
,"https://images.generated.photos/rcDCNQy6VRU5cx6TZMMBJOTaIeJB9fjdM1W3pHNemBA/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/MDc0MDM4LmpwZw.jpg"
,"https://images.generated.photos/f38cJdLUrtz4S34tj-XLBIqChjP2_XGhFUWpjsH7408/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/OTA0MDc0LmpwZw.jpg"
,"https://images.generated.photos/cg8BVzTA3r-v3PSrsobsUJED5k1Z41QJ14p1pX4jovc/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/Njk5NDY2LmpwZw.jpg"
,"https://images.generated.photos/yZe4-qr0QKM1djPOhY9TfynsPSNdAWX7TzDpiXDFWas/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/MjU0ODE0LmpwZw.jpg"
,"https://images.generated.photos/lkn7ax5_eDpiTrF-rQaDysMtcUifIGzORjJHsff1er0/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/NDU4OTk4LmpwZw.jpg"
,"https://images.generated.photos/lk2lz33KJK5YwL47MbCBNSeWx2sFpkdxV7OXZNook7g/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/NjY4NTAyLmpwZw.jpg"
,"https://images.generated.photos/VYL7d4Nq4XsKzE8eBUqIYFPlstgr8u8ByQ7u8pGlmT4/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/MzM3MzM2LmpwZw.jpg"
,"https://images.generated.photos/cxDDrzX9xLC1vTQWoWnxQlTD6H1kKdchX7PjMQK88eo/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/MTA0NzIxLmpwZw.jpg"
,"https://images.generated.photos/3Cm31lXfFVSwaBrirLA9xPGYILoCNcGxqdqMPuj8xzo/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/ODY5NTcyLmpwZw.jpg"
,"https://images.generated.photos/qf5icp_kx9gwRRR4oN-3ua1FT0lE1QDHyRYd9_P5paU/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/Nzg2OTY1LmpwZw.jpg"
,"https://images.generated.photos/lZ3uEcjFEo6r-l2IjewoSyg8T23k0m8_V5J-3fR1hl8/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/MDAxNjA1LmpwZw.jpg"
,"https://images.generated.photos/NqYVJlBP0wV9B-m5mLrkDm_I5gVUFXYQJaQ3wQD5NKE/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/MzUxNjUyLmpwZw.jpg"
,"https://images.generated.photos/tv5vT2-dfhLPd2LU12oO7mYUHZSnrxrPkrC4EvosIUk/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/NDc5NjQyLmpwZw.jpg"
,"https://images.generated.photos/8s2XXu-cH-aUamYZ44NYQLqBG1zX6eu5hNlgtC_YJfs/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/NzgxMDAxLmpwZw.jpg"
,"https://images.generated.photos/ZS9wtjpoBBEupEfVEHQ9Wag1r2NfXxg1pqfJs1Bav_U/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/OTc0MTUzLmpwZw.jpg"
,"https://images.generated.photos/fmAyy31LQeI8_ivFKfjUpRU_zr1yKeGo2UXYFuCiw6U/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/NTg3ODQxLmpwZw.jpg"
,"https://images.generated.photos/Xq4WDnHoTGq4r8k6qH05AZaqSyGnM7rNmUi3cLtMxoU/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/OTY3OTc0LmpwZw.jpg"
,"https://images.generated.photos/WZHvULKy7er1lXdJQdJlsREN66PwCQWwllTIIXDp2C4/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/NTgyMTA5LmpwZw.jpg"
,"https://images.generated.photos/W85TcACTUzkhDUO3x-zbSPcMknvE7Ry_i6PS68l5wKs/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/NTUxNDY0LmpwZw.jpg"
,"https://images.generated.photos/lsEOhoaSWbWz5-MdPneh1fHzRKnJvFEbsxRmdk8j5dg/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/MTYzNDk2LmpwZw.jpg"
,"https://images.generated.photos/zLKiCg_-L4ioBIk4FScL1qRIped8OTB64CmuuE5Il7Y/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/MjIzMzI2LmpwZw.jpg"
,"https://images.generated.photos/pprXhbLR3yXPf85mdmmoHBPXm9P2MA1FvjaNdNwBIbs/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/NDIxMjc0LmpwZw.jpg"
,"https://images.generated.photos/-2eXIVtmMTTnBI2WlEjxYnOOOaTplfX9i9pB8QnXvLc/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/MzkzMDAyLmpwZw.jpg"
,"https://images.generated.photos/C4hTYHvx6FM7aLK7kJ7bVlRD_3g1lXcWVyj6_tb_c6Q/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/NjI2MTY4LmpwZw.jpg"
,"https://images.generated.photos/zXOQldf8AhGnwkHDlMqBisOpreeMk_sLmw-FmT75CE0/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/OTYxNTMwLmpwZw.jpg"
,"https://images.generated.photos/80Ft0lGdNUMjKM5aXG1M4Ae6pISotADjh3ADIBPxJaM/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/NjI1OTk5LmpwZw.jpg"
,"https://images.generated.photos/lv5lASULuu22-HcRzJY3VPfCx5kJUtN7XUjfjIv6P00/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/MjY5MTk4LmpwZw.jpg"]

 # Adds a demo user, you can add other users here if you want
def seed_users():
    db.session.add(User(username='Demo', email='demo@aa.io', password='password', icon=random.choice(guy_photos)))
    db.session.add(User(username='marnie', email='marnie@aa.io', password='password', icon=random.choice(gal_photos)))
    db.session.add(User(username='bobbie', email='bobbie@aa.io', password='password', icon=random.choice(guy_photos)))
    for name in guy_names:
        db.session.add(User(username=name, email=f'{name}@{random.choice(emails)}.com', password='password', icon=random.choice(guy_photos)))
    for name in gal_names:
        db.session.add(User(username=name, email=f'{name}@{random.choice(emails)}.com', password='password', icon=random.choice(gal_photos)))
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
