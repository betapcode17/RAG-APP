from sqlalchemy import text
from core.database import engine

def test_db_connection():
    try:
        with engine.connect() as conn:
            result = conn.execute(
                text("SELECT current_user, current_database(), version()")
            ).fetchone()

            print("✅ Kết nối database thành công!")
            print(f"User     : {result[0]}")
            print(f"Database : {result[1]}")
            print(f"Version  : {result[2]}")
    except Exception as e:
        print("❌ Kết nối database thất bại!")
        print("Lỗi:", e)


if __name__ == "__main__":
    test_db_connection()
