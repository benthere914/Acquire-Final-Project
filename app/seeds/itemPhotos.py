import random
from app.models import db, Item, ItemPhoto
from faker import Faker
from .extra import antiques_photos, book_photos, camera_photos, clothing_photos, collectible_photos, computer_and_laptop_photos, \
phone_and_accessories_photos, electronics_photos, music_instruments_photos, pet_supply_photos,sporting_goods_photos, \
 toys_and_hobbies_photos, game_console_photos
fake = Faker()

def url_(i):
    if 1 <= i <= 10:
        return random.choice(antiques_photos[0:10])
    elif 11 <= i <= 20:
        return random.choice(antiques_photos[11:20])
    elif 21 <= i <= 30:
        return random.choice(antiques_photos[21:30])
    elif 31 <= i <= 40:
        return random.choice(book_photos[0:10])
    elif 41 <= i <= 50:
        return random.choice(book_photos[11:20])
    elif 51 <= i <= 60:
        return random.choice(book_photos[21:30])
    elif 61 <= i <= 70:
        return random.choice(camera_photos[0:10])
    elif 71 <= i <= 80:
        return random.choice(camera_photos[11:20])
    elif 81 <= i <= 90:
        return random.choice(camera_photos[21:30])
    elif 91 <= i <= 100:
        return random.choice(clothing_photos[0:10])
    elif 101 <= i <= 110:
        return random.choice(clothing_photos[11:20])
    elif 111 <= i <= 120:
        return random.choice(clothing_photos[21:30])
    elif 121 <= i <= 130:
        return random.choice(collectible_photos[0:10])
    elif 131 <= i <= 140:
        return random.choice(collectible_photos[11:20])
    elif 141 <= i <= 150:
        return random.choice(collectible_photos[21:30])
    elif 151 <= i <= 160:
        return random.choice(computer_and_laptop_photos[0:10])
    elif 161 <= i <= 170:
        return random.choice(computer_and_laptop_photos[11:20])
    elif 171 <= i <= 180:
        return random.choice(computer_and_laptop_photos[21:30])
    elif 181 <= i <= 190:
        return random.choice(phone_and_accessories_photos[0:10])
    elif 191 <= i <= 200:
        return random.choice(phone_and_accessories_photos[11:20])
    elif 201 <= i <= 210:
        return random.choice(phone_and_accessories_photos[21:30])
    elif 211 <= i <= 220:
        return random.choice(electronics_photos[0:10])
    elif 221 <= i <= 230:
        return random.choice(electronics_photos[11:20])
    elif 231 <= i <= 240:
        return random.choice(electronics_photos[21:30])
    elif 241 <= i <= 250:
        return random.choice(music_instruments_photos[0:10])
    elif 251 <= i <= 260:
        return random.choice(music_instruments_photos[11:20])
    elif 261 <= i <= 270:
        return random.choice(music_instruments_photos[21:30])
    elif 271 <= i <= 280:
        return random.choice(pet_supply_photos[0:10])
    elif 281 <= i <= 290:
        return random.choice(pet_supply_photos[11:20])
    elif 291 <= i <= 300:
        return random.choice(pet_supply_photos[21:30])
    elif 301 <= i <= 310:
        return random.choice(sporting_goods_photos[0:10])
    elif 311 <= i <= 320:
        return random.choice(sporting_goods_photos[11:20])
    elif 321 <= i <= 330:
        return random.choice(sporting_goods_photos[21:30])
    elif 331 <= i <= 340:
        return random.choice(toys_and_hobbies_photos[0:10])
    elif 341 <= i <= 350:
        return random.choice(toys_and_hobbies_photos[11:20])
    elif 351 <= i <= 360:
        return random.choice(toys_and_hobbies_photos[21:30])
    elif 361 <= i <= 370:
        return random.choice(game_console_photos[0:10])
    elif 371 <= i <= 380:
        return random.choice(game_console_photos[11:20])
    elif 381 <= i <= 390:
        return random.choice(game_console_photos[21:30])

def photos(i):
    photos_ = []
    while len(photos_) < 3:
        photo = url_(i)
        if not photo in photos_:
            photos_.append(photo)
    return photos_

# Adds a demo user, you can add other users here if you want
def seed_item_photos():
    for i in range(1, 391):
        for photo in photos(i):
            db.session.add(ItemPhoto(itemId=i, photoUrl=photo))
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_item_photos():
    db.session.execute('TRUNCATE item_photos RESTART IDENTITY CASCADE;')
    db.session.commit()
