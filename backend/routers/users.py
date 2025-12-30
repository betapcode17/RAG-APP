from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from passlib.context import CryptContext  # pip install passlib[bcrypt]

from core.database import get_db
from models import User
from schemas.user import UserCreate, UserResponse

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

router = APIRouter(prefix="/users", tags=["Users"])

@router.post("/", response_model=UserResponse)
def create_user(payload: UserCreate, db: Session = Depends(get_db)):
   
    existing = db.query(User).filter(User.email == payload.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = pwd_context.hash(payload.password) 
    user = User(
        email=payload.email,
        username=payload.username,
        password_hash=hashed_password 
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user