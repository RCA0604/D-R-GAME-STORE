DROP PROCEDURE USP_Producto
GO
CREATE PROCEDURE USP_Producto
AS
BEGIN
SELECT
'' + CONVERT(VARCHAR(50), P.Id)
	+ '|' + P.Descripcion
	+ '|' + P.Codigo
	+ '|' + CONVERT(VARCHAR(MAX), P.CodigoVenta)
	+ '|' + CONVERT(VARCHAR(50), P.CategoriaId)
	+ '|' + CONVERT(VARCHAR(50), P.Stock)
	+ '|' + CONVERT(VARCHAR(50), P.PrecioBase)
	+ '|' + CONVERT(VARCHAR(50), P.PlataformaId)
	+ '|' + CONVERT(VARCHAR(50), P.EstadoId)
	+ '|' + P.UsuarioCreacion
	+ '|' + CONVERT(VARCHAR(50), P.FechaCreacion, 103)
	+ '|' + ISNULL(P.UsuarioModificacion, '')
	+ '|' + ISNULL(CONVERT(VARCHAR(50), P.FechaModificacion, 103), '')
	+ '|' + ISNULL(P.UsuarioCompra, '')
	+ '|' + ISNULL(CONVERT(VARCHAR(50), P.FechaCompra, 103), '')
FROM Producto AS P
END
GO