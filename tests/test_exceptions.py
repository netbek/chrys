from chrys.exceptions import (
    PaletteDataEmptyError,
    PaletteNotFoundError,
    VendorNotFoundError,
)


class TestPaletteExceptions:
    def test_vendor_not_found(self):
        error = VendorNotFoundError("unknown")

        assert str(error) == 'Vendor "unknown" not found.'
        assert isinstance(error, ValueError)

    def test_palette_not_found(self):
        error = PaletteNotFoundError("vega_unknown")

        assert str(error) == 'Palette "vega_unknown" not found.'
        assert isinstance(error, ValueError)

    def test_palette_data_empty(self):
        error = PaletteDataEmptyError("vega_accent")

        assert str(error) == 'Palette data for "vega_accent" is empty.'
        assert isinstance(error, ValueError)
