from flask.cli import AppGroup
from .users import seed_users, undo_users
from .categories import seed_categories, undo_categories
from .items import seed_items, undo_items
from .itemPhotos import seed_item_photos, undo_item_photos
from .messageBoard import seed_message_boards, undo_message_boards
# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_categories()
    seed_items()
    seed_item_photos()
    seed_message_boards()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_categories()
    undo_items()
    undo_item_photos()
    undo_message_boards()
    # Add other undo functions here
