class VendorNotFoundError(ValueError):
    """Raised when a palette vendor is not found."""

    def __init__(self, vendor: str) -> None:
        super().__init__(f'Vendor "{vendor}" not found.')


class PaletteNotFoundError(ValueError):
    """Raised when a palette name is not found."""

    def __init__(self, name: str) -> None:
        super().__init__(f'Palette "{name}" not found.')


class PaletteDataEmptyError(ValueError):
    """Raised when a palette has no sizes."""

    def __init__(self, name: str) -> None:
        super().__init__(f'Palette data for "{name}" is empty.')
