from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from core.database import get_db
from schemas.user import UserCreate, UserResponse
from models.user import User

router = APIRouter(prefix="/users", tags=["Users"])


@router.post("/", response_model=UserResponse)
def create_user(payload: UserCreate, db: Session = Depends(get_db)):
    user = User(
        email=payload.email,
        username=payload.username,
        hashed_password=payload.password  # hash sau
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user
