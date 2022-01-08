from main import root

def test_root() -> None:
    """test root"""
    assert root("/") == "yes"
