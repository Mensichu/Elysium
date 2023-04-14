import { createNewProduct } from "../controllers/products.controller";

export const queries = {
    getAllProduct: 
        'SELECT * FROM Agente',
    addNewProduct: 
        'INSERT INTO Products (name,description,quantity) VALUES (@name,@description,@quantity)',
    getProductById:
        'SELECT * FROM Products WHERE Id=@Id',
    deleteProduct:
        'DELETE FROM [db_Elysium].[dbo].[Products] WHERE Id= @Id',
    getTotalProducts:
        'SELECT COUNT(*) FROM Agente',
    updateProductsById:
        'UPDATE [db_Elysium].[dbo].[Products] SET Name=@name, Description=@description, Quantity=@quantity WHERE Id=@id',


    // Marcas
    getAllMarca: 
        'SELECT [Id],[Marca],[Alias] FROM [db_Elysium].[dbo].[Marca] WHERE [Marca].Estado=1 ORDER BY Marca',
    addNewMarca: 
        'INSERT INTO [db_Elysium].[dbo].[Marca] (Marca,Alias,Creacion,Modificacion,Estado) OUTPUT INSERTED.Id VALUES (@Marca,@Marca,GETDATE(),GETDATE(),1)',
    updateAliasMarca: 
        'UPDATE [db_Elysium].[dbo].[Marca] SET [Marca].Alias=@Alias WHERE Marca.Id=@Marca',

    // Modelos
    getComboModeloById:
        'SELECT [Id],[Modelo],[Alias] FROM [db_Elysium].[dbo].[Auto] WHERE Marca=@idMarca AND [Auto].Estado=1 ORDER BY Modelo',

    getTablaModelos: 
        'SELECT [Auto].[Id],[Marca].[Marca],[Modelo],[Año],[Cilindraje],[Combustible] FROM [db_Elysium].[dbo].[Auto] INNER JOIN [db_Elysium].[dbo].[Marca] ON Auto.Marca= Marca.Id WHERE [Auto].Estado=1 ORDER BY [Marca].[Marca], Modelo',
    
    getModeloById:
        'SELECT [Auto].[Id],[Auto].[Marca],[Modelo],[Marca].[Alias],[Año],[Cilindraje],[Consumo_Motor],[Consumo_Caja],[Combustible] FROM [db_Elysium].[dbo].[Auto] INNER JOIN [db_Elysium].[dbo].[Marca] ON Auto.Marca= Marca.Id WHERE [Auto].Id=@idAuto AND [Auto].Estado=1',
    
    updateModeloById:
        'UPDATE [db_Elysium].[dbo].[Auto] SET Marca=@Marca, Modelo=@Modelo, Año=@Año, Cilindraje=@Cilindraje, Consumo_Motor=@Consumo_Motor, Consumo_Caja=@Consumo_Caja, Combustible=@Combustible, Modificacion=GETDATE() WHERE Auto.Id=@id ',
    
    addNewModelo: 
        'INSERT INTO [db_Elysium].[dbo].[Auto] (Marca,Modelo,Año,Cilindraje,Consumo_Motor,Consumo_Caja,Combustible,Creacion,Modificacion,Estado) OUTPUT INSERTED.Id VALUES (@Marca,@Modelo,@Año,@Cilindraje,@Consumo_Motor,@Consumo_Caja,@Combustible,GETDATE(),GETDATE(),1)'
    
    
}