

from fastapi import APIRouter, Depends
from requests import Session

from backend.db.session import get_db
from backend.models.chat import ChatCreate


router  = APIRouter()

# POST
def create_chat(
        db : Session = Depends(get_db)
        chat_in: ChatCreate,
        current_user: User = Depends(get_current_user)
):

# GET


# GET/{chat_id}

# POST/{chat_id}/message


# DELETE/{chat_id}