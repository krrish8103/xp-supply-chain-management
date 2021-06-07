
-- --------------------------------------------------
-- Entity Designer DDL Script for SQL Server 2005, 2008, 2012 and Azure
-- --------------------------------------------------
-- Date Created: 05/14/2017 00:16:47
-- Generated from EDMX file: C:\PPC\PPCApp\PPCAppDataModel\PPCDataModel.edmx
-- --------------------------------------------------

SET QUOTED_IDENTIFIER OFF;
GO
USE [PPC];
GO
IF SCHEMA_ID(N'dbo') IS NULL EXECUTE(N'CREATE SCHEMA [dbo]');
GO

-- --------------------------------------------------
-- Dropping existing FOREIGN KEY constraints
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[FK_tblBillOfMaterial_tblBillOfMaterialDetail]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblBillOfMaterialDetail] DROP CONSTRAINT [FK_tblBillOfMaterial_tblBillOfMaterialDetail];
GO
IF OBJECT_ID(N'[dbo].[FK_tblBillOfMaterial_tblMasterDrawing]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblBillOfMaterial] DROP CONSTRAINT [FK_tblBillOfMaterial_tblMasterDrawing];
GO
IF OBJECT_ID(N'[dbo].[FK_tblBillOfMaterial_tblMasterItem]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblBillOfMaterial] DROP CONSTRAINT [FK_tblBillOfMaterial_tblMasterItem];
GO
IF OBJECT_ID(N'[dbo].[FK_tblBillOfMaterial_tblUser_ApprovedBy]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblBillOfMaterial] DROP CONSTRAINT [FK_tblBillOfMaterial_tblUser_ApprovedBy];
GO
IF OBJECT_ID(N'[dbo].[FK_tblBillOfMaterial_tblUser_CreatedBy]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblBillOfMaterial] DROP CONSTRAINT [FK_tblBillOfMaterial_tblUser_CreatedBy];
GO
IF OBJECT_ID(N'[dbo].[FK_tblBillOfMaterialDetail_tblMasterBOMLevel]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblBillOfMaterialDetail] DROP CONSTRAINT [FK_tblBillOfMaterialDetail_tblMasterBOMLevel];
GO
IF OBJECT_ID(N'[dbo].[FK_tblBillOfMaterialDetail_tblMasterItem]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblBillOfMaterialDetail] DROP CONSTRAINT [FK_tblBillOfMaterialDetail_tblMasterItem];
GO
IF OBJECT_ID(N'[dbo].[FK_tblBillOfMaterialDetail_tblMasterUnitOfMeasure]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblBillOfMaterialDetail] DROP CONSTRAINT [FK_tblBillOfMaterialDetail_tblMasterUnitOfMeasure];
GO
IF OBJECT_ID(N'[dbo].[FK_tblCity_tblCountry]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblCity] DROP CONSTRAINT [FK_tblCity_tblCountry];
GO
IF OBJECT_ID(N'[dbo].[FK_tblCity_tblState]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblCity] DROP CONSTRAINT [FK_tblCity_tblState];
GO
IF OBJECT_ID(N'[dbo].[FK_tblCustomerOrder_tblMasterCustomer]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblCustomerOrder] DROP CONSTRAINT [FK_tblCustomerOrder_tblMasterCustomer];
GO
IF OBJECT_ID(N'[dbo].[FK_tblCustomerOrderDetails_tblCustomerOrder]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblCustomerOrderDetails] DROP CONSTRAINT [FK_tblCustomerOrderDetails_tblCustomerOrder];
GO
IF OBJECT_ID(N'[dbo].[FK_tblCustomerOrderDetails_tblMasterItem]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblCustomerOrderDetails] DROP CONSTRAINT [FK_tblCustomerOrderDetails_tblMasterItem];
GO
IF OBJECT_ID(N'[dbo].[FK_tblGoodReciptNoteDetail_tblGoodReciptNote]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblGoodReciptNoteDetail] DROP CONSTRAINT [FK_tblGoodReciptNoteDetail_tblGoodReciptNote];
GO
IF OBJECT_ID(N'[dbo].[FK_tblGoodReciptNoteDetail_tblMasterItem]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblGoodReciptNoteDetail] DROP CONSTRAINT [FK_tblGoodReciptNoteDetail_tblMasterItem];
GO
IF OBJECT_ID(N'[dbo].[FK_tblGoodReciptNoteDetail_tblMasterUnitOfMeasure]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblGoodReciptNoteDetail] DROP CONSTRAINT [FK_tblGoodReciptNoteDetail_tblMasterUnitOfMeasure];
GO
IF OBJECT_ID(N'[dbo].[FK_tblIndentItem_tblIndent]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblIndentItem] DROP CONSTRAINT [FK_tblIndentItem_tblIndent];
GO
IF OBJECT_ID(N'[dbo].[FK_tblIndentItem_tblMasterItem]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblIndentItem] DROP CONSTRAINT [FK_tblIndentItem_tblMasterItem];
GO
IF OBJECT_ID(N'[dbo].[FK_tblIndentItem_tblMasterUnitOfMeasure]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblIndentItem] DROP CONSTRAINT [FK_tblIndentItem_tblMasterUnitOfMeasure];
GO
IF OBJECT_ID(N'[dbo].[FK_tblItemRequestDetail_tblItemRequest]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblIssueItemDetail] DROP CONSTRAINT [FK_tblItemRequestDetail_tblItemRequest];
GO
IF OBJECT_ID(N'[dbo].[FK_tblItemRequestDetail_tblMasterItem]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblIssueItemDetail] DROP CONSTRAINT [FK_tblItemRequestDetail_tblMasterItem];
GO
IF OBJECT_ID(N'[dbo].[FK_tblLocationBinBuffer_tblMasterItem]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblLocationBinBuffer] DROP CONSTRAINT [FK_tblLocationBinBuffer_tblMasterItem];
GO
IF OBJECT_ID(N'[dbo].[FK_tblLoginInfo_tblUser]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblLoginInfo] DROP CONSTRAINT [FK_tblLoginInfo_tblUser];
GO
IF OBJECT_ID(N'[dbo].[FK_tblMasterBin_tblMasterBin]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblMasterBin] DROP CONSTRAINT [FK_tblMasterBin_tblMasterBin];
GO
IF OBJECT_ID(N'[dbo].[FK_tblMasterBin_tblMasterLocation]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblMasterBin] DROP CONSTRAINT [FK_tblMasterBin_tblMasterLocation];
GO
IF OBJECT_ID(N'[dbo].[FK_tblMasterBOMOperation_tblMasterUnitOfMeasure]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblMasterBOMOperation] DROP CONSTRAINT [FK_tblMasterBOMOperation_tblMasterUnitOfMeasure];
GO
IF OBJECT_ID(N'[dbo].[FK_tblMasterCustomer_tblCity]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblMasterCustomer] DROP CONSTRAINT [FK_tblMasterCustomer_tblCity];
GO
IF OBJECT_ID(N'[dbo].[FK_tblMasterCustomer_tblCity1]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblMasterCustomer] DROP CONSTRAINT [FK_tblMasterCustomer_tblCity1];
GO
IF OBJECT_ID(N'[dbo].[FK_tblMasterCustomer_tblCountry]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblMasterCustomer] DROP CONSTRAINT [FK_tblMasterCustomer_tblCountry];
GO
IF OBJECT_ID(N'[dbo].[FK_tblMasterCustomer_tblCountry1]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblMasterCustomer] DROP CONSTRAINT [FK_tblMasterCustomer_tblCountry1];
GO
IF OBJECT_ID(N'[dbo].[FK_tblMasterCustomer_tblMasterCustomerSupplierType]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblMasterCustomer] DROP CONSTRAINT [FK_tblMasterCustomer_tblMasterCustomerSupplierType];
GO
IF OBJECT_ID(N'[dbo].[FK_tblMasterCustomer_tblState]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblMasterCustomer] DROP CONSTRAINT [FK_tblMasterCustomer_tblState];
GO
IF OBJECT_ID(N'[dbo].[FK_tblMasterCustomer_tblState1]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblMasterCustomer] DROP CONSTRAINT [FK_tblMasterCustomer_tblState1];
GO
IF OBJECT_ID(N'[dbo].[FK_tblMasterCustomerContact_tblMasterCustomer]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblMasterCustomerContact] DROP CONSTRAINT [FK_tblMasterCustomerContact_tblMasterCustomer];
GO
IF OBJECT_ID(N'[dbo].[FK_tblMasterCustomerContact_tblMasterDepartment]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblMasterCustomerContact] DROP CONSTRAINT [FK_tblMasterCustomerContact_tblMasterDepartment];
GO
IF OBJECT_ID(N'[dbo].[FK_tblMasterDrawing_tblMasterItem]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblMasterDrawing] DROP CONSTRAINT [FK_tblMasterDrawing_tblMasterItem];
GO
IF OBJECT_ID(N'[dbo].[FK_tblMasterItem_tblMasterItemCategory]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblMasterItem] DROP CONSTRAINT [FK_tblMasterItem_tblMasterItemCategory];
GO
IF OBJECT_ID(N'[dbo].[FK_tblMasterItem_tblMasterUnitOfMeasure]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblMasterItem] DROP CONSTRAINT [FK_tblMasterItem_tblMasterUnitOfMeasure];
GO
IF OBJECT_ID(N'[dbo].[FK_tblMasterLocation_tblCity]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblMasterLocation] DROP CONSTRAINT [FK_tblMasterLocation_tblCity];
GO
IF OBJECT_ID(N'[dbo].[FK_tblMasterLocationContact_tblMasterLocation]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblMasterLocationContact] DROP CONSTRAINT [FK_tblMasterLocationContact_tblMasterLocation];
GO
IF OBJECT_ID(N'[dbo].[FK_tblMasterLocationContact_tblUser]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblMasterLocationContact] DROP CONSTRAINT [FK_tblMasterLocationContact_tblUser];
GO
IF OBJECT_ID(N'[dbo].[FK_tblProductionPlan_tblSalesForcast]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblProductionPlan] DROP CONSTRAINT [FK_tblProductionPlan_tblSalesForcast];
GO
IF OBJECT_ID(N'[dbo].[FK_tblProductionPlanDetails_tblMasterItem]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblProductionPlanDetails] DROP CONSTRAINT [FK_tblProductionPlanDetails_tblMasterItem];
GO
IF OBJECT_ID(N'[dbo].[FK_tblProductionPlanDetails_tblProductionPlan]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblProductionPlanDetails] DROP CONSTRAINT [FK_tblProductionPlanDetails_tblProductionPlan];
GO
IF OBJECT_ID(N'[dbo].[FK_tblProductionPlanSchedule_tblProductionPlanDetails]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblProductionPlanSchedule] DROP CONSTRAINT [FK_tblProductionPlanSchedule_tblProductionPlanDetails];
GO
IF OBJECT_ID(N'[dbo].[FK_tblPurchase_tblMasterVendor]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblPurchase] DROP CONSTRAINT [FK_tblPurchase_tblMasterVendor];
GO
IF OBJECT_ID(N'[dbo].[FK_tblPurchaseItem_tblMasterItem]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblPurchaseItem] DROP CONSTRAINT [FK_tblPurchaseItem_tblMasterItem];
GO
IF OBJECT_ID(N'[dbo].[FK_tblPurchaseItem_tblMasterUnitOfMeasure]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblPurchaseItem] DROP CONSTRAINT [FK_tblPurchaseItem_tblMasterUnitOfMeasure];
GO
IF OBJECT_ID(N'[dbo].[FK_tblPurchaseItem_tblPurchase]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblPurchaseItem] DROP CONSTRAINT [FK_tblPurchaseItem_tblPurchase];
GO
IF OBJECT_ID(N'[dbo].[FK_tblRoleMenu_tblMenu]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblRoleMenu] DROP CONSTRAINT [FK_tblRoleMenu_tblMenu];
GO
IF OBJECT_ID(N'[dbo].[FK_tblRoleMenu_tblRole]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblRoleMenu] DROP CONSTRAINT [FK_tblRoleMenu_tblRole];
GO
IF OBJECT_ID(N'[dbo].[FK_tblRolePermission_tblRole]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblRolePermission] DROP CONSTRAINT [FK_tblRolePermission_tblRole];
GO
IF OBJECT_ID(N'[dbo].[FK_tblState_tblCountry]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblState] DROP CONSTRAINT [FK_tblState_tblCountry];
GO
IF OBJECT_ID(N'[dbo].[FK_tblStock_tblMasterItem]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblStock] DROP CONSTRAINT [FK_tblStock_tblMasterItem];
GO
IF OBJECT_ID(N'[dbo].[FK_tblStock_tblMasterUnitOfMeasure]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblStock] DROP CONSTRAINT [FK_tblStock_tblMasterUnitOfMeasure];
GO
IF OBJECT_ID(N'[dbo].[FK_tblStockCreditDetails_tblMasterItem]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblStockCreditDetails] DROP CONSTRAINT [FK_tblStockCreditDetails_tblMasterItem];
GO
IF OBJECT_ID(N'[dbo].[FK_tblStockCreditDetails_tblStoreCredit]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblStockCreditDetails] DROP CONSTRAINT [FK_tblStockCreditDetails_tblStoreCredit];
GO
IF OBJECT_ID(N'[dbo].[FK_tblUserRole_tblLoginInfo]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblUserRole] DROP CONSTRAINT [FK_tblUserRole_tblLoginInfo];
GO
IF OBJECT_ID(N'[dbo].[FK_tblUserRole_tblRole]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblUserRole] DROP CONSTRAINT [FK_tblUserRole_tblRole];
GO
IF OBJECT_ID(N'[dbo].[FK_tblWorkOrder_tblBillOfMaterial]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblWorkOrder] DROP CONSTRAINT [FK_tblWorkOrder_tblBillOfMaterial];
GO
IF OBJECT_ID(N'[dbo].[FK_tblWorkOrder_tblCustomerOrder]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblWorkOrder] DROP CONSTRAINT [FK_tblWorkOrder_tblCustomerOrder];
GO
IF OBJECT_ID(N'[dbo].[FK_tblWorkOrder_tblMasterDepartment]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblWorkOrder] DROP CONSTRAINT [FK_tblWorkOrder_tblMasterDepartment];
GO
IF OBJECT_ID(N'[dbo].[FK_tblWorkOrder_tblMasterItem1]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblWorkOrder] DROP CONSTRAINT [FK_tblWorkOrder_tblMasterItem1];
GO
IF OBJECT_ID(N'[dbo].[FK_tblWorkOrder_tblProductionPlan]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblWorkOrder] DROP CONSTRAINT [FK_tblWorkOrder_tblProductionPlan];
GO
IF OBJECT_ID(N'[dbo].[FK_tblWorkOrder_tblSalesForcast]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblWorkOrder] DROP CONSTRAINT [FK_tblWorkOrder_tblSalesForcast];
GO
IF OBJECT_ID(N'[dbo].[FK_tblWorkOrder_tblUser]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblWorkOrder] DROP CONSTRAINT [FK_tblWorkOrder_tblUser];
GO
IF OBJECT_ID(N'[dbo].[FK_tblWorkOrder_tblUser1]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblWorkOrder] DROP CONSTRAINT [FK_tblWorkOrder_tblUser1];
GO
IF OBJECT_ID(N'[dbo].[FK_tblWorkOrder_tblUser2]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblWorkOrder] DROP CONSTRAINT [FK_tblWorkOrder_tblUser2];
GO
IF OBJECT_ID(N'[dbo].[FK_tblWorkOrderDetail_tblMasterItem]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblWorkOrderDetail] DROP CONSTRAINT [FK_tblWorkOrderDetail_tblMasterItem];
GO
IF OBJECT_ID(N'[dbo].[FK_tblWorkOrderDetail_tblWorkOrder]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblWorkOrderDetail] DROP CONSTRAINT [FK_tblWorkOrderDetail_tblWorkOrder];
GO

-- --------------------------------------------------
-- Dropping existing tables
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[lkuSCMLookupData]', 'U') IS NOT NULL
    DROP TABLE [dbo].[lkuSCMLookupData];
GO
IF OBJECT_ID(N'[dbo].[lkuSCMLookupMaster]', 'U') IS NOT NULL
    DROP TABLE [dbo].[lkuSCMLookupMaster];
GO
IF OBJECT_ID(N'[dbo].[sysdiagrams]', 'U') IS NOT NULL
    DROP TABLE [dbo].[sysdiagrams];
GO
IF OBJECT_ID(N'[dbo].[tblBillOfMaterial]', 'U') IS NOT NULL
    DROP TABLE [dbo].[tblBillOfMaterial];
GO
IF OBJECT_ID(N'[dbo].[tblBillOfMaterialDetail]', 'U') IS NOT NULL
    DROP TABLE [dbo].[tblBillOfMaterialDetail];
GO
IF OBJECT_ID(N'[dbo].[tblCity]', 'U') IS NOT NULL
    DROP TABLE [dbo].[tblCity];
GO
IF OBJECT_ID(N'[dbo].[tblClient]', 'U') IS NOT NULL
    DROP TABLE [dbo].[tblClient];
GO
IF OBJECT_ID(N'[dbo].[tblCountry]', 'U') IS NOT NULL
    DROP TABLE [dbo].[tblCountry];
GO
IF OBJECT_ID(N'[dbo].[tblCustomerOrder]', 'U') IS NOT NULL
    DROP TABLE [dbo].[tblCustomerOrder];
GO
IF OBJECT_ID(N'[dbo].[tblCustomerOrderDetails]', 'U') IS NOT NULL
    DROP TABLE [dbo].[tblCustomerOrderDetails];
GO
IF OBJECT_ID(N'[dbo].[tblGoodReciptNote]', 'U') IS NOT NULL
    DROP TABLE [dbo].[tblGoodReciptNote];
GO
IF OBJECT_ID(N'[dbo].[tblGoodReciptNoteDetail]', 'U') IS NOT NULL
    DROP TABLE [dbo].[tblGoodReciptNoteDetail];
GO
IF OBJECT_ID(N'[dbo].[tblIndent]', 'U') IS NOT NULL
    DROP TABLE [dbo].[tblIndent];
GO
IF OBJECT_ID(N'[dbo].[tblIndentItem]', 'U') IS NOT NULL
    DROP TABLE [dbo].[tblIndentItem];
GO
IF OBJECT_ID(N'[dbo].[tblIssueItem]', 'U') IS NOT NULL
    DROP TABLE [dbo].[tblIssueItem];
GO
IF OBJECT_ID(N'[dbo].[tblIssueItemDetail]', 'U') IS NOT NULL
    DROP TABLE [dbo].[tblIssueItemDetail];
GO
IF OBJECT_ID(N'[dbo].[tblLocationBinBuffer]', 'U') IS NOT NULL
    DROP TABLE [dbo].[tblLocationBinBuffer];
GO
IF OBJECT_ID(N'[dbo].[tblLoginInfo]', 'U') IS NOT NULL
    DROP TABLE [dbo].[tblLoginInfo];
GO
IF OBJECT_ID(N'[dbo].[tblMasterBin]', 'U') IS NOT NULL
    DROP TABLE [dbo].[tblMasterBin];
GO
IF OBJECT_ID(N'[dbo].[tblMasterBOMLevel]', 'U') IS NOT NULL
    DROP TABLE [dbo].[tblMasterBOMLevel];
GO
IF OBJECT_ID(N'[dbo].[tblMasterBOMOperation]', 'U') IS NOT NULL
    DROP TABLE [dbo].[tblMasterBOMOperation];
GO
IF OBJECT_ID(N'[dbo].[tblMasterCustomer]', 'U') IS NOT NULL
    DROP TABLE [dbo].[tblMasterCustomer];
GO
IF OBJECT_ID(N'[dbo].[tblMasterCustomerContact]', 'U') IS NOT NULL
    DROP TABLE [dbo].[tblMasterCustomerContact];
GO
IF OBJECT_ID(N'[dbo].[tblMasterCustomerSupplierType]', 'U') IS NOT NULL
    DROP TABLE [dbo].[tblMasterCustomerSupplierType];
GO
IF OBJECT_ID(N'[dbo].[tblMasterDepartment]', 'U') IS NOT NULL
    DROP TABLE [dbo].[tblMasterDepartment];
GO
IF OBJECT_ID(N'[dbo].[tblMasterDesignation]', 'U') IS NOT NULL
    DROP TABLE [dbo].[tblMasterDesignation];
GO
IF OBJECT_ID(N'[dbo].[tblMasterDocumentType]', 'U') IS NOT NULL
    DROP TABLE [dbo].[tblMasterDocumentType];
GO
IF OBJECT_ID(N'[dbo].[tblMasterDrawing]', 'U') IS NOT NULL
    DROP TABLE [dbo].[tblMasterDrawing];
GO
IF OBJECT_ID(N'[dbo].[tblMasterItem]', 'U') IS NOT NULL
    DROP TABLE [dbo].[tblMasterItem];
GO
IF OBJECT_ID(N'[dbo].[tblMasterItemCategory]', 'U') IS NOT NULL
    DROP TABLE [dbo].[tblMasterItemCategory];
GO
IF OBJECT_ID(N'[dbo].[tblMasterLocation]', 'U') IS NOT NULL
    DROP TABLE [dbo].[tblMasterLocation];
GO
IF OBJECT_ID(N'[dbo].[tblMasterLocationContact]', 'U') IS NOT NULL
    DROP TABLE [dbo].[tblMasterLocationContact];
GO
IF OBJECT_ID(N'[dbo].[tblMasterTax]', 'U') IS NOT NULL
    DROP TABLE [dbo].[tblMasterTax];
GO
IF OBJECT_ID(N'[dbo].[tblMasterUnitOfMeasure]', 'U') IS NOT NULL
    DROP TABLE [dbo].[tblMasterUnitOfMeasure];
GO
IF OBJECT_ID(N'[dbo].[tblMasterVendor]', 'U') IS NOT NULL
    DROP TABLE [dbo].[tblMasterVendor];
GO
IF OBJECT_ID(N'[dbo].[tblMenu]', 'U') IS NOT NULL
    DROP TABLE [dbo].[tblMenu];
GO
IF OBJECT_ID(N'[dbo].[tblProductionPlan]', 'U') IS NOT NULL
    DROP TABLE [dbo].[tblProductionPlan];
GO
IF OBJECT_ID(N'[dbo].[tblProductionPlanDetails]', 'U') IS NOT NULL
    DROP TABLE [dbo].[tblProductionPlanDetails];
GO
IF OBJECT_ID(N'[dbo].[tblProductionPlanSchedule]', 'U') IS NOT NULL
    DROP TABLE [dbo].[tblProductionPlanSchedule];
GO
IF OBJECT_ID(N'[dbo].[tblPurchase]', 'U') IS NOT NULL
    DROP TABLE [dbo].[tblPurchase];
GO
IF OBJECT_ID(N'[dbo].[tblPurchaseItem]', 'U') IS NOT NULL
    DROP TABLE [dbo].[tblPurchaseItem];
GO
IF OBJECT_ID(N'[dbo].[tblRefreshToken]', 'U') IS NOT NULL
    DROP TABLE [dbo].[tblRefreshToken];
GO
IF OBJECT_ID(N'[dbo].[tblRole]', 'U') IS NOT NULL
    DROP TABLE [dbo].[tblRole];
GO
IF OBJECT_ID(N'[dbo].[tblRoleMenu]', 'U') IS NOT NULL
    DROP TABLE [dbo].[tblRoleMenu];
GO
IF OBJECT_ID(N'[dbo].[tblRolePermission]', 'U') IS NOT NULL
    DROP TABLE [dbo].[tblRolePermission];
GO
IF OBJECT_ID(N'[dbo].[tblSalesForcast]', 'U') IS NOT NULL
    DROP TABLE [dbo].[tblSalesForcast];
GO
IF OBJECT_ID(N'[dbo].[tblState]', 'U') IS NOT NULL
    DROP TABLE [dbo].[tblState];
GO
IF OBJECT_ID(N'[dbo].[tblStock]', 'U') IS NOT NULL
    DROP TABLE [dbo].[tblStock];
GO
IF OBJECT_ID(N'[dbo].[tblStockCreditDetails]', 'U') IS NOT NULL
    DROP TABLE [dbo].[tblStockCreditDetails];
GO
IF OBJECT_ID(N'[dbo].[tblStoreCredit]', 'U') IS NOT NULL
    DROP TABLE [dbo].[tblStoreCredit];
GO
IF OBJECT_ID(N'[dbo].[tblTransaction]', 'U') IS NOT NULL
    DROP TABLE [dbo].[tblTransaction];
GO
IF OBJECT_ID(N'[dbo].[tblUser]', 'U') IS NOT NULL
    DROP TABLE [dbo].[tblUser];
GO
IF OBJECT_ID(N'[dbo].[tblUserRole]', 'U') IS NOT NULL
    DROP TABLE [dbo].[tblUserRole];
GO
IF OBJECT_ID(N'[dbo].[tblWorkOrder]', 'U') IS NOT NULL
    DROP TABLE [dbo].[tblWorkOrder];
GO
IF OBJECT_ID(N'[dbo].[tblWorkOrderDetail]', 'U') IS NOT NULL
    DROP TABLE [dbo].[tblWorkOrderDetail];
GO

-- --------------------------------------------------
-- Creating all tables
-- --------------------------------------------------

-- Creating table 'sysdiagrams'
CREATE TABLE [dbo].[sysdiagrams] (
    [name] nvarchar(128)  NOT NULL,
    [principal_id] int  NOT NULL,
    [diagram_id] int IDENTITY(1,1) NOT NULL,
    [version] int  NULL,
    [definition] varbinary(max)  NULL
);
GO

-- Creating table 'tblCities'
CREATE TABLE [dbo].[tblCities] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Identifier] varchar(10)  NULL,
    [City] varchar(500)  NULL,
    [StateId] int  NULL,
    [CountryId] int  NULL
);
GO

-- Creating table 'tblClients'
CREATE TABLE [dbo].[tblClients] (
    [Id] nvarchar(128)  NOT NULL,
    [Name] nvarchar(1000)  NOT NULL,
    [Secret] nvarchar(max)  NOT NULL,
    [Description] nvarchar(100)  NOT NULL,
    [ApplicationType] int  NULL,
    [Active] bit  NOT NULL,
    [RefreshTokenLifeTime] int  NOT NULL,
    [AllowedOrigin] nvarchar(1000)  NULL,
    [Logo] varbinary(max)  NULL,
    [ClientImage] varbinary(max)  NULL
);
GO

-- Creating table 'tblCountries'
CREATE TABLE [dbo].[tblCountries] (
    [Id] int  NOT NULL,
    [Identifier] varchar(5)  NULL,
    [Country] varchar(100)  NULL,
    [Capital] varchar(100)  NULL,
    [Currency] varchar(100)  NULL
);
GO

-- Creating table 'tblGoodReciptNotes'
CREATE TABLE [dbo].[tblGoodReciptNotes] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [GRNDescription] varchar(max)  NULL,
    [AddedOn] datetime  NULL,
    [AddedBy] int  NULL,
    [PurchaseOrderNo] int  NULL,
    [DocumentTypeId] int  NULL
);
GO

-- Creating table 'tblGoodReciptNoteDetails'
CREATE TABLE [dbo].[tblGoodReciptNoteDetails] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [GRNId] int  NOT NULL,
    [ItemId] int  NULL,
    [QuantityRecived] decimal(18,0)  NULL,
    [UOM] int  NULL,
    [PricePerUnit] decimal(18,0)  NULL
);
GO

-- Creating table 'tblIndents'
CREATE TABLE [dbo].[tblIndents] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [IndentDescription] varchar(max)  NULL,
    [AddedBy] int  NULL,
    [AddedOn] datetime  NULL,
    [ExpectedDate] datetime  NULL,
    [IndentStatus] int  NULL,
    [DepartmentId] int  NULL
);
GO

-- Creating table 'tblIndentItems'
CREATE TABLE [dbo].[tblIndentItems] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [IndentId] int  NULL,
    [ItemId] int  NULL,
    [Quantity] decimal(18,4)  NULL,
    [UOM] int  NULL
);
GO

-- Creating table 'tblIssueItems'
CREATE TABLE [dbo].[tblIssueItems] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [IssueItemDesc] varchar(max)  NULL,
    [RequestDate] datetime  NULL,
    [ExpectedDate] datetime  NULL,
    [RequestStatus] varchar(50)  NULL,
    [RequestedBy] int  NULL,
    [DelStatus] bit  NULL,
    [DelOn] datetime  NULL
);
GO

-- Creating table 'tblIssueItemDetails'
CREATE TABLE [dbo].[tblIssueItemDetails] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [IssueItemId] int  NULL,
    [ItemId] int  NULL,
    [Quantity] decimal(18,4)  NULL,
    [UOM] int  NULL
);
GO

-- Creating table 'tblLocationBinBuffers'
CREATE TABLE [dbo].[tblLocationBinBuffers] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [LocationId] int  NULL,
    [BinId] int  NULL,
    [ItemId] int  NULL,
    [StockQuantity] decimal(18,0)  NULL
);
GO

-- Creating table 'tblLoginInfoes'
CREATE TABLE [dbo].[tblLoginInfoes] (
    [LoginId] int IDENTITY(1,1) NOT NULL,
    [UserId] int  NULL,
    [Email] varchar(4000)  NOT NULL,
    [Password] varchar(50)  NOT NULL,
    [LoginName] varchar(4000)  NOT NULL,
    [IsEmailVerified] bit  NULL,
    [LastLoginOn] datetime  NULL,
    [LoginFailedAttempt] int  NULL,
    [CreatedIP] varchar(50)  NULL,
    [LastLoginIP] varchar(50)  NULL,
    [PasswordLastUpdated] datetime  NULL,
    [IsBlock] bit  NULL,
    [IsActive] bit  NULL,
    [DelStatus] bit  NULL
);
GO

-- Creating table 'tblMasterCustomers'
CREATE TABLE [dbo].[tblMasterCustomers] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Identifier] varchar(50)  NULL,
    [LegalName] varchar(500)  NULL,
    [Name] varchar(500)  NULL,
    [CustomerType] int  NULL,
    [AddressLine1] varchar(500)  NULL,
    [AddressLine2] varchar(500)  NULL,
    [City] int  NULL,
    [State] int  NULL,
    [Country] int  NULL,
    [Zip] varchar(50)  NULL,
    [Phone] varchar(50)  NULL,
    [Mobile1] varchar(50)  NULL,
    [Mobile2] varchar(50)  NULL,
    [Fax] varchar(50)  NULL,
    [Email] varchar(50)  NULL,
    [TINNumber] varchar(50)  NULL,
    [ShippingAddressLine1] varchar(500)  NULL,
    [ShippingAddressLine2] varchar(500)  NULL,
    [ShippingCity] int  NULL,
    [ShippingState] int  NULL,
    [ShippingCountry] int  NULL,
    [ShippingZip] varchar(50)  NULL,
    [LicenceNumber] varchar(50)  NULL,
    [AddedBy] int  NULL,
    [AddedOn] datetime  NULL,
    [LastUpBy] int  NULL,
    [LastUpOn] datetime  NULL,
    [DelStatus] bit  NULL
);
GO

-- Creating table 'tblMasterCustomerContacts'
CREATE TABLE [dbo].[tblMasterCustomerContacts] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Name] varchar(100)  NULL,
    [Designation] varchar(100)  NULL,
    [Phone] varchar(50)  NULL,
    [Mobile1] varchar(50)  NULL,
    [Mobile2] varchar(50)  NULL,
    [Email] varchar(50)  NULL,
    [Department] int  NULL,
    [IsDefault] bit  NULL,
    [CustomerId] int  NULL
);
GO

-- Creating table 'tblMasterCustomerSupplierTypes'
CREATE TABLE [dbo].[tblMasterCustomerSupplierTypes] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Identifier] varchar(50)  NULL,
    [Description] varchar(100)  NULL,
    [AddedBy] int  NULL,
    [AddedOn] datetime  NULL,
    [LastUpBy] int  NULL,
    [LastUpOn] datetime  NULL,
    [DelStatus] bit  NULL
);
GO

-- Creating table 'tblMasterDepartments'
CREATE TABLE [dbo].[tblMasterDepartments] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [DepartmentCode] varchar(50)  NULL,
    [DepartmentDescription] varchar(200)  NULL,
    [AddedBY] int  NULL,
    [AddedOn] datetime  NULL,
    [LastUpBy] int  NULL,
    [LastUpOn] datetime  NULL,
    [DelStatus] bit  NULL
);
GO

-- Creating table 'tblMasterDrawings'
CREATE TABLE [dbo].[tblMasterDrawings] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Identifier] varchar(50)  NULL,
    [Version] varchar(50)  NULL,
    [Description] varchar(max)  NULL,
    [Drawing] varbinary(max)  NULL,
    [ItemId] int  NULL,
    [Active] bit  NULL,
    [AddedBY] int  NULL,
    [AddedOn] datetime  NULL,
    [LastUpBy] int  NULL,
    [LastUpOn] datetime  NULL,
    [DelStatus] bit  NULL
);
GO

-- Creating table 'tblMasterItems'
CREATE TABLE [dbo].[tblMasterItems] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Identifier] varchar(50)  NULL,
    [PartNumber] varchar(50)  NULL,
    [ItemName] varchar(100)  NULL,
    [ItemDescription] varchar(max)  NULL,
    [ItemCategory] int  NULL,
    [MinStockLevel] decimal(18,0)  NULL,
    [MaxStockLevel] decimal(18,0)  NULL,
    [UOM] int  NULL,
    [Reprocurement] decimal(18,2)  NULL,
    [ReprocurementUnit] varchar(50)  NULL,
    [LeadTime] decimal(18,2)  NULL,
    [AddedBy] int  NULL,
    [AddedOn] datetime  NULL,
    [LastUpBy] int  NULL,
    [LastUpOn] datetime  NULL,
    [DelStatus] bit  NULL
);
GO

-- Creating table 'tblMasterItemCategories'
CREATE TABLE [dbo].[tblMasterItemCategories] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Code] varchar(50)  NULL,
    [Description] varchar(100)  NULL,
    [AddedBy] int  NULL,
    [AddedOn] datetime  NULL,
    [LastUpBy] int  NULL,
    [LastUpOn] datetime  NULL,
    [DelStatus] bit  NULL
);
GO

-- Creating table 'tblMasterTaxes'
CREATE TABLE [dbo].[tblMasterTaxes] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [TaxCode] varchar(50)  NULL,
    [TaxDescription] varchar(200)  NULL,
    [Percentage] decimal(18,2)  NULL,
    [AddedBY] int  NULL,
    [AddedOn] datetime  NULL,
    [LastUpBy] int  NULL,
    [LastUpOn] datetime  NULL,
    [DelStatus] bit  NULL
);
GO

-- Creating table 'tblMasterUnitOfMeasures'
CREATE TABLE [dbo].[tblMasterUnitOfMeasures] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [UOMCode] varchar(50)  NULL,
    [UOMDescription] varchar(200)  NULL,
    [DelStatus] bit  NULL,
    [AddedBy] int  NULL,
    [AddedOn] datetime  NULL,
    [LastUpBy] int  NULL,
    [LastUpOn] datetime  NULL
);
GO

-- Creating table 'tblMasterVendors'
CREATE TABLE [dbo].[tblMasterVendors] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [VendorCode] varchar(50)  NULL,
    [VendorDescrition] varchar(200)  NULL,
    [VendorDescription] varchar(200)  NULL,
    [AddedBY] int  NULL,
    [AddedOn] datetime  NULL,
    [LastUpBy] int  NULL,
    [LastUpOn] datetime  NULL,
    [DelStatus] bit  NULL
);
GO

-- Creating table 'tblMenus'
CREATE TABLE [dbo].[tblMenus] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [MenuName] nvarchar(50)  NOT NULL,
    [ParentId] int  NOT NULL,
    [Route] nvarchar(100)  NOT NULL,
    [hasChildren] bit  NOT NULL,
    [MenuOrder] decimal(18,4)  NULL,
    [IsShow] bit  NOT NULL,
    [IsLoginRequired] bit  NULL,
    [MenuIcon] varchar(50)  NULL
);
GO

-- Creating table 'tblPurchases'
CREATE TABLE [dbo].[tblPurchases] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [PurchaseDescription] varchar(max)  NULL,
    [AddedBy] int  NULL,
    [AddedOn] datetime  NULL,
    [ExpectedDate] datetime  NULL,
    [PurchaseStatus] int  NULL,
    [VendorId] int  NULL,
    [BillNo] int  NULL
);
GO

-- Creating table 'tblPurchaseItems'
CREATE TABLE [dbo].[tblPurchaseItems] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [PurchaseId] int  NULL,
    [ItemId] int  NULL,
    [Quantity] decimal(18,4)  NULL,
    [UOM] int  NULL,
    [PricePerUnit] decimal(18,4)  NULL
);
GO

-- Creating table 'tblRefreshTokens'
CREATE TABLE [dbo].[tblRefreshTokens] (
    [Id] nvarchar(128)  NOT NULL,
    [Subject] nvarchar(50)  NOT NULL,
    [ClientId] nvarchar(50)  NOT NULL,
    [ExpiresUtc] datetime  NULL,
    [IssuedUtc] datetime  NULL,
    [ProtectedTicket] nvarchar(4000)  NOT NULL
);
GO

-- Creating table 'tblRoles'
CREATE TABLE [dbo].[tblRoles] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [RoleName] varchar(500)  NULL,
    [RoleDescription] varchar(max)  NULL,
    [DelStatus] bit  NULL
);
GO

-- Creating table 'tblRoleMenus'
CREATE TABLE [dbo].[tblRoleMenus] (
    [Id] int  NOT NULL,
    [RoleId] int  NULL,
    [MenuId] int  NULL
);
GO

-- Creating table 'tblRolePermissions'
CREATE TABLE [dbo].[tblRolePermissions] (
    [Id] int  NOT NULL,
    [RoleId] int  NULL,
    [IsAddEdit] bit  NULL,
    [IsView] bit  NULL
);
GO

-- Creating table 'tblStates'
CREATE TABLE [dbo].[tblStates] (
    [Id] int  NOT NULL,
    [Identifier] varchar(5)  NULL,
    [State] varchar(500)  NULL,
    [CountryId] int  NULL
);
GO

-- Creating table 'tblStocks'
CREATE TABLE [dbo].[tblStocks] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [ItemId] int  NULL,
    [Quantity] int  NULL,
    [UOM] int  NULL
);
GO

-- Creating table 'tblStockCreditDetails'
CREATE TABLE [dbo].[tblStockCreditDetails] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [StoreCreditId] int  NULL,
    [ItemId] int  NULL,
    [Quantity] decimal(18,4)  NULL
);
GO

-- Creating table 'tblStoreCredits'
CREATE TABLE [dbo].[tblStoreCredits] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [StoreCreditDescription] varchar(max)  NULL,
    [AddedOn] datetime  NULL,
    [AddedBy] int  NULL
);
GO

-- Creating table 'tblTransactions'
CREATE TABLE [dbo].[tblTransactions] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [DocType] int  NULL,
    [DocNumber] int  NULL,
    [Date] datetime  NULL,
    [ItemId] int  NULL,
    [Qty] decimal(18,0)  NULL,
    [UOM] int  NULL
);
GO

-- Creating table 'tblUsers'
CREATE TABLE [dbo].[tblUsers] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [FirstName] varchar(50)  NULL,
    [MiddleName] varchar(50)  NULL,
    [LastName] varchar(50)  NULL,
    [Designation] varchar(50)  NULL,
    [ContactNo1] varchar(50)  NULL,
    [ContactNo2] varchar(50)  NULL,
    [Address] varchar(50)  NULL,
    [Photo] varbinary(max)  NULL
);
GO

-- Creating table 'tblUserRoles'
CREATE TABLE [dbo].[tblUserRoles] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [LoginId] int  NULL,
    [RoleId] int  NULL
);
GO

-- Creating table 'tblMasterBOMOperations'
CREATE TABLE [dbo].[tblMasterBOMOperations] (
    [lngId] int IDENTITY(1,1) NOT NULL,
    [strOperation] varchar(1000)  NULL,
    [Description] varchar(1000)  NULL,
    [intUnit] int  NULL,
    [AddedBy] int  NULL,
    [AddedOn] datetime  NULL,
    [LastUpBy] int  NULL,
    [LastUpOn] datetime  NULL,
    [DelStatus] bit  NULL
);
GO

-- Creating table 'tblBillOfMaterialDetails'
CREATE TABLE [dbo].[tblBillOfMaterialDetails] (
    [lngId] int IDENTITY(1,1) NOT NULL,
    [lngBOMId] int  NULL,
    [lngItemId] int  NULL,
    [lngQuantity] decimal(18,0)  NULL,
    [lngLevelId] int  NULL,
    [strNote] varchar(1000)  NULL
);
GO

-- Creating table 'tblMasterBOMLevels'
CREATE TABLE [dbo].[tblMasterBOMLevels] (
    [lngId] int IDENTITY(1,1) NOT NULL,
    [Identifier] varchar(50)  NULL,
    [Description] varchar(100)  NULL,
    [AddedBy] int  NULL,
    [AddedOn] datetime  NULL,
    [LastUpBy] int  NULL,
    [LastUpOn] datetime  NULL,
    [DelStatus] bit  NULL
);
GO

-- Creating table 'tblBillOfMaterials'
CREATE TABLE [dbo].[tblBillOfMaterials] (
    [lngId] int IDENTITY(1,1) NOT NULL,
    [strBOMNumber] varchar(50)  NULL,
    [lngItemId] int  NULL,
    [strBOMDescription] varchar(max)  NULL,
    [strVersion] varchar(100)  NULL,
    [decBatchQty] decimal(18,4)  NULL,
    [intDiagramId] int  NULL,
    [intDrawingNo] int  NULL,
    [intLastUpBy] int  NULL,
    [datLastUpOn] datetime  NULL,
    [intCreatedBy] int  NULL,
    [datCreatedOn] datetime  NULL,
    [boolIsApproved] bit  NULL,
    [intApprovedBy] int  NULL,
    [datApprovedOn] datetime  NULL,
    [boolDelStatus] bit  NULL
);
GO

-- Creating table 'tblMasterBins'
CREATE TABLE [dbo].[tblMasterBins] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [BinIdentifier] varchar(50)  NULL,
    [BinDescription] varchar(200)  NULL,
    [LocationId] int  NULL,
    [IsActive] bit  NULL,
    [BinCapacity] varchar(50)  NULL,
    [AddedBY] int  NULL,
    [AddedOn] datetime  NULL,
    [LastUpBy] int  NULL,
    [LastUpOn] datetime  NULL,
    [DelStatus] bit  NULL
);
GO

-- Creating table 'tblMasterDocumentTypes'
CREATE TABLE [dbo].[tblMasterDocumentTypes] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [DocumentTypeCode] varchar(50)  NULL,
    [DocumentTypeDescription] varchar(200)  NULL,
    [Type] varchar(50)  NULL,
    [AddedBY] int  NULL,
    [AddedOn] datetime  NULL,
    [LastUpBy] int  NULL,
    [LastUpOn] datetime  NULL,
    [DelStatus] bit  NULL
);
GO

-- Creating table 'tblMasterLocations'
CREATE TABLE [dbo].[tblMasterLocations] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Identifier] varchar(50)  NULL,
    [Name] varchar(200)  NULL,
    [Description] varchar(200)  NULL,
    [AddressLine1] varchar(500)  NULL,
    [AddressLine2] varchar(500)  NULL,
    [CityId] int  NULL,
    [Zip] varchar(50)  NULL,
    [IsActive] bit  NULL,
    [AddedBY] int  NULL,
    [AddedOn] datetime  NULL,
    [LastUpBy] int  NULL,
    [LastUpOn] datetime  NULL,
    [DelStatus] bit  NULL
);
GO

-- Creating table 'tblMasterDesignations'
CREATE TABLE [dbo].[tblMasterDesignations] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Identifier] varchar(50)  NULL,
    [Description] varchar(100)  NULL,
    [AddedBy] int  NULL,
    [AddedOn] datetime  NULL,
    [LastUpBy] int  NULL,
    [LastUpOn] datetime  NULL,
    [DelStatus] bit  NULL
);
GO

-- Creating table 'tblCustomerOrders'
CREATE TABLE [dbo].[tblCustomerOrders] (
    [lngId] int IDENTITY(1,1) NOT NULL,
    [strCustOrderNumber] varchar(50)  NULL,
    [datCustOrderDate] datetime  NULL,
    [intCustomerId] int  NULL,
    [decOrderValue] decimal(18,4)  NULL,
    [datDeliveryDate] datetime  NULL
);
GO

-- Creating table 'tblCustomerOrderDetails'
CREATE TABLE [dbo].[tblCustomerOrderDetails] (
    [lngId] int IDENTITY(1,1) NOT NULL,
    [intCustomerOrderId] int  NULL,
    [intItemId] int  NULL,
    [decOrderedQuantity] decimal(18,4)  NULL,
    [decDeliveredQuantity] decimal(18,4)  NULL,
    [decOpenQuantity] decimal(18,4)  NULL
);
GO

-- Creating table 'tblProductionPlans'
CREATE TABLE [dbo].[tblProductionPlans] (
    [lngid] int IDENTITY(1,1) NOT NULL,
    [strPPNumber] varchar(50)  NULL,
    [datPPDate] datetime  NULL,
    [intSFNumber] int  NULL,
    [datSFDate] datetime  NULL,
    [intCustomerOrderId] int  NULL,
    [CreatedBy] int  NULL,
    [CreatedOn] datetime  NULL,
    [LastUpBy] int  NULL,
    [LastUpOn] datetime  NULL,
    [DelStatus] bit  NULL
);
GO

-- Creating table 'tblProductionPlanDetails'
CREATE TABLE [dbo].[tblProductionPlanDetails] (
    [lngId] int IDENTITY(1,1) NOT NULL,
    [intPPId] int  NULL,
    [intItemId] int  NULL,
    [decPlannedQuantity] decimal(18,4)  NULL,
    [decProducedQuantity] decimal(18,4)  NULL,
    [decOpenQuantity] decimal(18,4)  NULL
);
GO

-- Creating table 'tblProductionPlanSchedules'
CREATE TABLE [dbo].[tblProductionPlanSchedules] (
    [lngId] int IDENTITY(1,1) NOT NULL,
    [intProductionPlanDetailsId] int  NULL,
    [datStartDate] datetime  NULL,
    [datEndDate] datetime  NULL
);
GO

-- Creating table 'tblSalesForcasts'
CREATE TABLE [dbo].[tblSalesForcasts] (
    [lngId] int IDENTITY(1,1) NOT NULL,
    [strSFNumber] varchar(50)  NULL
);
GO

-- Creating table 'tblWorkOrderDetails'
CREATE TABLE [dbo].[tblWorkOrderDetails] (
    [lngId] int IDENTITY(1,1) NOT NULL,
    [lngWOId] int  NULL,
    [lngItemId] int  NULL,
    [lngQuantity] decimal(18,4)  NULL,
    [intPhase] varchar(50)  NULL,
    [strNote] varchar(500)  NULL
);
GO

-- Creating table 'tblMasterLocationContacts'
CREATE TABLE [dbo].[tblMasterLocationContacts] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [EmployeeId] int  NULL,
    [LocationId] int  NULL,
    [IsActive] bit  NULL,
    [IsDefault] bit  NULL
);
GO

-- Creating table 'lkuSCMLookupDatas'
CREATE TABLE [dbo].[lkuSCMLookupDatas] (
    [lngId] int IDENTITY(1,1) NOT NULL,
    [lngLookupMasterId] int  NOT NULL,
    [strCode] varchar(200)  NULL,
    [strDescription] varchar(200)  NULL,
    [intSequence] int  NOT NULL,
    [blnActive] bit  NULL
);
GO

-- Creating table 'lkuSCMLookupMasters'
CREATE TABLE [dbo].[lkuSCMLookupMasters] (
    [lngId] int IDENTITY(1,1) NOT NULL,
    [strDescription] varchar(200)  NULL,
    [blnVisible] bit  NULL
);
GO

-- Creating table 'tblWorkOrders'
CREATE TABLE [dbo].[tblWorkOrders] (
    [lngId] int IDENTITY(1,1) NOT NULL,
    [lngItemId] int  NULL,
    [strWONumber] nvarchar(10)  NULL,
    [datExpectedDateOfCompletation] datetime  NULL,
    [decBatchQty] decimal(10,2)  NULL,
    [intDepartmentId] int  NULL,
    [intBOMId] int  NULL,
    [intProductionPlanId] int  NULL,
    [intSalesForecastId] int  NULL,
    [intCustomerOrderId] int  NULL,
    [strWODescription] nvarchar(max)  NULL,
    [intCreatedBy] int  NULL,
    [datCreatedDate] datetime  NULL,
    [intApprovedBy] int  NULL,
    [datApprovedDate] datetime  NULL,
    [intAssignedTo] int  NULL,
    [datAssignedDate] datetime  NULL,
    [intLastUpBy] int  NULL,
    [datLastUpOn] datetime  NULL,
    [boolDelStatus] bit  NULL
);
GO

-- --------------------------------------------------
-- Creating all PRIMARY KEY constraints
-- --------------------------------------------------

-- Creating primary key on [diagram_id] in table 'sysdiagrams'
ALTER TABLE [dbo].[sysdiagrams]
ADD CONSTRAINT [PK_sysdiagrams]
    PRIMARY KEY CLUSTERED ([diagram_id] ASC);
GO

-- Creating primary key on [Id] in table 'tblCities'
ALTER TABLE [dbo].[tblCities]
ADD CONSTRAINT [PK_tblCities]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'tblClients'
ALTER TABLE [dbo].[tblClients]
ADD CONSTRAINT [PK_tblClients]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'tblCountries'
ALTER TABLE [dbo].[tblCountries]
ADD CONSTRAINT [PK_tblCountries]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'tblGoodReciptNotes'
ALTER TABLE [dbo].[tblGoodReciptNotes]
ADD CONSTRAINT [PK_tblGoodReciptNotes]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'tblGoodReciptNoteDetails'
ALTER TABLE [dbo].[tblGoodReciptNoteDetails]
ADD CONSTRAINT [PK_tblGoodReciptNoteDetails]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'tblIndents'
ALTER TABLE [dbo].[tblIndents]
ADD CONSTRAINT [PK_tblIndents]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'tblIndentItems'
ALTER TABLE [dbo].[tblIndentItems]
ADD CONSTRAINT [PK_tblIndentItems]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'tblIssueItems'
ALTER TABLE [dbo].[tblIssueItems]
ADD CONSTRAINT [PK_tblIssueItems]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'tblIssueItemDetails'
ALTER TABLE [dbo].[tblIssueItemDetails]
ADD CONSTRAINT [PK_tblIssueItemDetails]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'tblLocationBinBuffers'
ALTER TABLE [dbo].[tblLocationBinBuffers]
ADD CONSTRAINT [PK_tblLocationBinBuffers]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [LoginId] in table 'tblLoginInfoes'
ALTER TABLE [dbo].[tblLoginInfoes]
ADD CONSTRAINT [PK_tblLoginInfoes]
    PRIMARY KEY CLUSTERED ([LoginId] ASC);
GO

-- Creating primary key on [Id] in table 'tblMasterCustomers'
ALTER TABLE [dbo].[tblMasterCustomers]
ADD CONSTRAINT [PK_tblMasterCustomers]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'tblMasterCustomerContacts'
ALTER TABLE [dbo].[tblMasterCustomerContacts]
ADD CONSTRAINT [PK_tblMasterCustomerContacts]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'tblMasterCustomerSupplierTypes'
ALTER TABLE [dbo].[tblMasterCustomerSupplierTypes]
ADD CONSTRAINT [PK_tblMasterCustomerSupplierTypes]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'tblMasterDepartments'
ALTER TABLE [dbo].[tblMasterDepartments]
ADD CONSTRAINT [PK_tblMasterDepartments]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'tblMasterDrawings'
ALTER TABLE [dbo].[tblMasterDrawings]
ADD CONSTRAINT [PK_tblMasterDrawings]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'tblMasterItems'
ALTER TABLE [dbo].[tblMasterItems]
ADD CONSTRAINT [PK_tblMasterItems]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'tblMasterItemCategories'
ALTER TABLE [dbo].[tblMasterItemCategories]
ADD CONSTRAINT [PK_tblMasterItemCategories]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'tblMasterTaxes'
ALTER TABLE [dbo].[tblMasterTaxes]
ADD CONSTRAINT [PK_tblMasterTaxes]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'tblMasterUnitOfMeasures'
ALTER TABLE [dbo].[tblMasterUnitOfMeasures]
ADD CONSTRAINT [PK_tblMasterUnitOfMeasures]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'tblMasterVendors'
ALTER TABLE [dbo].[tblMasterVendors]
ADD CONSTRAINT [PK_tblMasterVendors]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'tblMenus'
ALTER TABLE [dbo].[tblMenus]
ADD CONSTRAINT [PK_tblMenus]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'tblPurchases'
ALTER TABLE [dbo].[tblPurchases]
ADD CONSTRAINT [PK_tblPurchases]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'tblPurchaseItems'
ALTER TABLE [dbo].[tblPurchaseItems]
ADD CONSTRAINT [PK_tblPurchaseItems]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'tblRefreshTokens'
ALTER TABLE [dbo].[tblRefreshTokens]
ADD CONSTRAINT [PK_tblRefreshTokens]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'tblRoles'
ALTER TABLE [dbo].[tblRoles]
ADD CONSTRAINT [PK_tblRoles]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'tblRoleMenus'
ALTER TABLE [dbo].[tblRoleMenus]
ADD CONSTRAINT [PK_tblRoleMenus]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'tblRolePermissions'
ALTER TABLE [dbo].[tblRolePermissions]
ADD CONSTRAINT [PK_tblRolePermissions]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'tblStates'
ALTER TABLE [dbo].[tblStates]
ADD CONSTRAINT [PK_tblStates]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'tblStocks'
ALTER TABLE [dbo].[tblStocks]
ADD CONSTRAINT [PK_tblStocks]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'tblStockCreditDetails'
ALTER TABLE [dbo].[tblStockCreditDetails]
ADD CONSTRAINT [PK_tblStockCreditDetails]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'tblStoreCredits'
ALTER TABLE [dbo].[tblStoreCredits]
ADD CONSTRAINT [PK_tblStoreCredits]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'tblTransactions'
ALTER TABLE [dbo].[tblTransactions]
ADD CONSTRAINT [PK_tblTransactions]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'tblUsers'
ALTER TABLE [dbo].[tblUsers]
ADD CONSTRAINT [PK_tblUsers]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'tblUserRoles'
ALTER TABLE [dbo].[tblUserRoles]
ADD CONSTRAINT [PK_tblUserRoles]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [lngId] in table 'tblMasterBOMOperations'
ALTER TABLE [dbo].[tblMasterBOMOperations]
ADD CONSTRAINT [PK_tblMasterBOMOperations]
    PRIMARY KEY CLUSTERED ([lngId] ASC);
GO

-- Creating primary key on [lngId] in table 'tblBillOfMaterialDetails'
ALTER TABLE [dbo].[tblBillOfMaterialDetails]
ADD CONSTRAINT [PK_tblBillOfMaterialDetails]
    PRIMARY KEY CLUSTERED ([lngId] ASC);
GO

-- Creating primary key on [lngId] in table 'tblMasterBOMLevels'
ALTER TABLE [dbo].[tblMasterBOMLevels]
ADD CONSTRAINT [PK_tblMasterBOMLevels]
    PRIMARY KEY CLUSTERED ([lngId] ASC);
GO

-- Creating primary key on [lngId] in table 'tblBillOfMaterials'
ALTER TABLE [dbo].[tblBillOfMaterials]
ADD CONSTRAINT [PK_tblBillOfMaterials]
    PRIMARY KEY CLUSTERED ([lngId] ASC);
GO

-- Creating primary key on [Id] in table 'tblMasterBins'
ALTER TABLE [dbo].[tblMasterBins]
ADD CONSTRAINT [PK_tblMasterBins]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'tblMasterDocumentTypes'
ALTER TABLE [dbo].[tblMasterDocumentTypes]
ADD CONSTRAINT [PK_tblMasterDocumentTypes]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'tblMasterLocations'
ALTER TABLE [dbo].[tblMasterLocations]
ADD CONSTRAINT [PK_tblMasterLocations]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'tblMasterDesignations'
ALTER TABLE [dbo].[tblMasterDesignations]
ADD CONSTRAINT [PK_tblMasterDesignations]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [lngId] in table 'tblCustomerOrders'
ALTER TABLE [dbo].[tblCustomerOrders]
ADD CONSTRAINT [PK_tblCustomerOrders]
    PRIMARY KEY CLUSTERED ([lngId] ASC);
GO

-- Creating primary key on [lngId] in table 'tblCustomerOrderDetails'
ALTER TABLE [dbo].[tblCustomerOrderDetails]
ADD CONSTRAINT [PK_tblCustomerOrderDetails]
    PRIMARY KEY CLUSTERED ([lngId] ASC);
GO

-- Creating primary key on [lngid] in table 'tblProductionPlans'
ALTER TABLE [dbo].[tblProductionPlans]
ADD CONSTRAINT [PK_tblProductionPlans]
    PRIMARY KEY CLUSTERED ([lngid] ASC);
GO

-- Creating primary key on [lngId] in table 'tblProductionPlanDetails'
ALTER TABLE [dbo].[tblProductionPlanDetails]
ADD CONSTRAINT [PK_tblProductionPlanDetails]
    PRIMARY KEY CLUSTERED ([lngId] ASC);
GO

-- Creating primary key on [lngId] in table 'tblProductionPlanSchedules'
ALTER TABLE [dbo].[tblProductionPlanSchedules]
ADD CONSTRAINT [PK_tblProductionPlanSchedules]
    PRIMARY KEY CLUSTERED ([lngId] ASC);
GO

-- Creating primary key on [lngId] in table 'tblSalesForcasts'
ALTER TABLE [dbo].[tblSalesForcasts]
ADD CONSTRAINT [PK_tblSalesForcasts]
    PRIMARY KEY CLUSTERED ([lngId] ASC);
GO

-- Creating primary key on [lngId] in table 'tblWorkOrderDetails'
ALTER TABLE [dbo].[tblWorkOrderDetails]
ADD CONSTRAINT [PK_tblWorkOrderDetails]
    PRIMARY KEY CLUSTERED ([lngId] ASC);
GO

-- Creating primary key on [Id] in table 'tblMasterLocationContacts'
ALTER TABLE [dbo].[tblMasterLocationContacts]
ADD CONSTRAINT [PK_tblMasterLocationContacts]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [lngId] in table 'lkuSCMLookupDatas'
ALTER TABLE [dbo].[lkuSCMLookupDatas]
ADD CONSTRAINT [PK_lkuSCMLookupDatas]
    PRIMARY KEY CLUSTERED ([lngId] ASC);
GO

-- Creating primary key on [lngId] in table 'lkuSCMLookupMasters'
ALTER TABLE [dbo].[lkuSCMLookupMasters]
ADD CONSTRAINT [PK_lkuSCMLookupMasters]
    PRIMARY KEY CLUSTERED ([lngId] ASC);
GO

-- Creating primary key on [lngId] in table 'tblWorkOrders'
ALTER TABLE [dbo].[tblWorkOrders]
ADD CONSTRAINT [PK_tblWorkOrders]
    PRIMARY KEY CLUSTERED ([lngId] ASC);
GO

-- --------------------------------------------------
-- Creating all FOREIGN KEY constraints
-- --------------------------------------------------

-- Creating foreign key on [CountryId] in table 'tblCities'
ALTER TABLE [dbo].[tblCities]
ADD CONSTRAINT [FK_tblCity_tblCountry]
    FOREIGN KEY ([CountryId])
    REFERENCES [dbo].[tblCountries]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_tblCity_tblCountry'
CREATE INDEX [IX_FK_tblCity_tblCountry]
ON [dbo].[tblCities]
    ([CountryId]);
GO

-- Creating foreign key on [StateId] in table 'tblCities'
ALTER TABLE [dbo].[tblCities]
ADD CONSTRAINT [FK_tblCity_tblState]
    FOREIGN KEY ([StateId])
    REFERENCES [dbo].[tblStates]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_tblCity_tblState'
CREATE INDEX [IX_FK_tblCity_tblState]
ON [dbo].[tblCities]
    ([StateId]);
GO

-- Creating foreign key on [City] in table 'tblMasterCustomers'
ALTER TABLE [dbo].[tblMasterCustomers]
ADD CONSTRAINT [FK_tblMasterCustomer_tblCity]
    FOREIGN KEY ([City])
    REFERENCES [dbo].[tblCities]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_tblMasterCustomer_tblCity'
CREATE INDEX [IX_FK_tblMasterCustomer_tblCity]
ON [dbo].[tblMasterCustomers]
    ([City]);
GO

-- Creating foreign key on [ShippingCity] in table 'tblMasterCustomers'
ALTER TABLE [dbo].[tblMasterCustomers]
ADD CONSTRAINT [FK_tblMasterCustomer_tblCity1]
    FOREIGN KEY ([ShippingCity])
    REFERENCES [dbo].[tblCities]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_tblMasterCustomer_tblCity1'
CREATE INDEX [IX_FK_tblMasterCustomer_tblCity1]
ON [dbo].[tblMasterCustomers]
    ([ShippingCity]);
GO

-- Creating foreign key on [Country] in table 'tblMasterCustomers'
ALTER TABLE [dbo].[tblMasterCustomers]
ADD CONSTRAINT [FK_tblMasterCustomer_tblCountry]
    FOREIGN KEY ([Country])
    REFERENCES [dbo].[tblCountries]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_tblMasterCustomer_tblCountry'
CREATE INDEX [IX_FK_tblMasterCustomer_tblCountry]
ON [dbo].[tblMasterCustomers]
    ([Country]);
GO

-- Creating foreign key on [ShippingCountry] in table 'tblMasterCustomers'
ALTER TABLE [dbo].[tblMasterCustomers]
ADD CONSTRAINT [FK_tblMasterCustomer_tblCountry1]
    FOREIGN KEY ([ShippingCountry])
    REFERENCES [dbo].[tblCountries]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_tblMasterCustomer_tblCountry1'
CREATE INDEX [IX_FK_tblMasterCustomer_tblCountry1]
ON [dbo].[tblMasterCustomers]
    ([ShippingCountry]);
GO

-- Creating foreign key on [CountryId] in table 'tblStates'
ALTER TABLE [dbo].[tblStates]
ADD CONSTRAINT [FK_tblState_tblCountry]
    FOREIGN KEY ([CountryId])
    REFERENCES [dbo].[tblCountries]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_tblState_tblCountry'
CREATE INDEX [IX_FK_tblState_tblCountry]
ON [dbo].[tblStates]
    ([CountryId]);
GO

-- Creating foreign key on [GRNId] in table 'tblGoodReciptNoteDetails'
ALTER TABLE [dbo].[tblGoodReciptNoteDetails]
ADD CONSTRAINT [FK_tblGoodReciptNoteDetail_tblGoodReciptNote]
    FOREIGN KEY ([GRNId])
    REFERENCES [dbo].[tblGoodReciptNotes]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_tblGoodReciptNoteDetail_tblGoodReciptNote'
CREATE INDEX [IX_FK_tblGoodReciptNoteDetail_tblGoodReciptNote]
ON [dbo].[tblGoodReciptNoteDetails]
    ([GRNId]);
GO

-- Creating foreign key on [ItemId] in table 'tblGoodReciptNoteDetails'
ALTER TABLE [dbo].[tblGoodReciptNoteDetails]
ADD CONSTRAINT [FK_tblGoodReciptNoteDetail_tblMasterItem]
    FOREIGN KEY ([ItemId])
    REFERENCES [dbo].[tblMasterItems]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_tblGoodReciptNoteDetail_tblMasterItem'
CREATE INDEX [IX_FK_tblGoodReciptNoteDetail_tblMasterItem]
ON [dbo].[tblGoodReciptNoteDetails]
    ([ItemId]);
GO

-- Creating foreign key on [UOM] in table 'tblGoodReciptNoteDetails'
ALTER TABLE [dbo].[tblGoodReciptNoteDetails]
ADD CONSTRAINT [FK_tblGoodReciptNoteDetail_tblMasterUnitOfMeasure]
    FOREIGN KEY ([UOM])
    REFERENCES [dbo].[tblMasterUnitOfMeasures]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_tblGoodReciptNoteDetail_tblMasterUnitOfMeasure'
CREATE INDEX [IX_FK_tblGoodReciptNoteDetail_tblMasterUnitOfMeasure]
ON [dbo].[tblGoodReciptNoteDetails]
    ([UOM]);
GO

-- Creating foreign key on [IndentId] in table 'tblIndentItems'
ALTER TABLE [dbo].[tblIndentItems]
ADD CONSTRAINT [FK_tblIndentItem_tblIndent]
    FOREIGN KEY ([IndentId])
    REFERENCES [dbo].[tblIndents]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_tblIndentItem_tblIndent'
CREATE INDEX [IX_FK_tblIndentItem_tblIndent]
ON [dbo].[tblIndentItems]
    ([IndentId]);
GO

-- Creating foreign key on [ItemId] in table 'tblIndentItems'
ALTER TABLE [dbo].[tblIndentItems]
ADD CONSTRAINT [FK_tblIndentItem_tblMasterItem]
    FOREIGN KEY ([ItemId])
    REFERENCES [dbo].[tblMasterItems]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_tblIndentItem_tblMasterItem'
CREATE INDEX [IX_FK_tblIndentItem_tblMasterItem]
ON [dbo].[tblIndentItems]
    ([ItemId]);
GO

-- Creating foreign key on [UOM] in table 'tblIndentItems'
ALTER TABLE [dbo].[tblIndentItems]
ADD CONSTRAINT [FK_tblIndentItem_tblMasterUnitOfMeasure]
    FOREIGN KEY ([UOM])
    REFERENCES [dbo].[tblMasterUnitOfMeasures]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_tblIndentItem_tblMasterUnitOfMeasure'
CREATE INDEX [IX_FK_tblIndentItem_tblMasterUnitOfMeasure]
ON [dbo].[tblIndentItems]
    ([UOM]);
GO

-- Creating foreign key on [IssueItemId] in table 'tblIssueItemDetails'
ALTER TABLE [dbo].[tblIssueItemDetails]
ADD CONSTRAINT [FK_tblItemRequestDetail_tblItemRequest]
    FOREIGN KEY ([IssueItemId])
    REFERENCES [dbo].[tblIssueItems]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_tblItemRequestDetail_tblItemRequest'
CREATE INDEX [IX_FK_tblItemRequestDetail_tblItemRequest]
ON [dbo].[tblIssueItemDetails]
    ([IssueItemId]);
GO

-- Creating foreign key on [ItemId] in table 'tblIssueItemDetails'
ALTER TABLE [dbo].[tblIssueItemDetails]
ADD CONSTRAINT [FK_tblItemRequestDetail_tblMasterItem]
    FOREIGN KEY ([ItemId])
    REFERENCES [dbo].[tblMasterItems]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_tblItemRequestDetail_tblMasterItem'
CREATE INDEX [IX_FK_tblItemRequestDetail_tblMasterItem]
ON [dbo].[tblIssueItemDetails]
    ([ItemId]);
GO

-- Creating foreign key on [ItemId] in table 'tblLocationBinBuffers'
ALTER TABLE [dbo].[tblLocationBinBuffers]
ADD CONSTRAINT [FK_tblLocationBinBuffer_tblMasterItem]
    FOREIGN KEY ([ItemId])
    REFERENCES [dbo].[tblMasterItems]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_tblLocationBinBuffer_tblMasterItem'
CREATE INDEX [IX_FK_tblLocationBinBuffer_tblMasterItem]
ON [dbo].[tblLocationBinBuffers]
    ([ItemId]);
GO

-- Creating foreign key on [UserId] in table 'tblLoginInfoes'
ALTER TABLE [dbo].[tblLoginInfoes]
ADD CONSTRAINT [FK_tblLoginInfo_tblUser]
    FOREIGN KEY ([UserId])
    REFERENCES [dbo].[tblUsers]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_tblLoginInfo_tblUser'
CREATE INDEX [IX_FK_tblLoginInfo_tblUser]
ON [dbo].[tblLoginInfoes]
    ([UserId]);
GO

-- Creating foreign key on [LoginId] in table 'tblUserRoles'
ALTER TABLE [dbo].[tblUserRoles]
ADD CONSTRAINT [FK_tblUserRole_tblLoginInfo]
    FOREIGN KEY ([LoginId])
    REFERENCES [dbo].[tblLoginInfoes]
        ([LoginId])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_tblUserRole_tblLoginInfo'
CREATE INDEX [IX_FK_tblUserRole_tblLoginInfo]
ON [dbo].[tblUserRoles]
    ([LoginId]);
GO

-- Creating foreign key on [CustomerType] in table 'tblMasterCustomers'
ALTER TABLE [dbo].[tblMasterCustomers]
ADD CONSTRAINT [FK_tblMasterCustomer_tblMasterCustomerSupplierType]
    FOREIGN KEY ([CustomerType])
    REFERENCES [dbo].[tblMasterCustomerSupplierTypes]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_tblMasterCustomer_tblMasterCustomerSupplierType'
CREATE INDEX [IX_FK_tblMasterCustomer_tblMasterCustomerSupplierType]
ON [dbo].[tblMasterCustomers]
    ([CustomerType]);
GO

-- Creating foreign key on [State] in table 'tblMasterCustomers'
ALTER TABLE [dbo].[tblMasterCustomers]
ADD CONSTRAINT [FK_tblMasterCustomer_tblState]
    FOREIGN KEY ([State])
    REFERENCES [dbo].[tblStates]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_tblMasterCustomer_tblState'
CREATE INDEX [IX_FK_tblMasterCustomer_tblState]
ON [dbo].[tblMasterCustomers]
    ([State]);
GO

-- Creating foreign key on [ShippingState] in table 'tblMasterCustomers'
ALTER TABLE [dbo].[tblMasterCustomers]
ADD CONSTRAINT [FK_tblMasterCustomer_tblState1]
    FOREIGN KEY ([ShippingState])
    REFERENCES [dbo].[tblStates]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_tblMasterCustomer_tblState1'
CREATE INDEX [IX_FK_tblMasterCustomer_tblState1]
ON [dbo].[tblMasterCustomers]
    ([ShippingState]);
GO

-- Creating foreign key on [CustomerId] in table 'tblMasterCustomerContacts'
ALTER TABLE [dbo].[tblMasterCustomerContacts]
ADD CONSTRAINT [FK_tblMasterCustomerContact_tblMasterCustomer]
    FOREIGN KEY ([CustomerId])
    REFERENCES [dbo].[tblMasterCustomers]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_tblMasterCustomerContact_tblMasterCustomer'
CREATE INDEX [IX_FK_tblMasterCustomerContact_tblMasterCustomer]
ON [dbo].[tblMasterCustomerContacts]
    ([CustomerId]);
GO

-- Creating foreign key on [Department] in table 'tblMasterCustomerContacts'
ALTER TABLE [dbo].[tblMasterCustomerContacts]
ADD CONSTRAINT [FK_tblMasterCustomerContact_tblMasterDepartment]
    FOREIGN KEY ([Department])
    REFERENCES [dbo].[tblMasterDepartments]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_tblMasterCustomerContact_tblMasterDepartment'
CREATE INDEX [IX_FK_tblMasterCustomerContact_tblMasterDepartment]
ON [dbo].[tblMasterCustomerContacts]
    ([Department]);
GO

-- Creating foreign key on [ItemId] in table 'tblMasterDrawings'
ALTER TABLE [dbo].[tblMasterDrawings]
ADD CONSTRAINT [FK_tblMasterDrawing_tblMasterItem]
    FOREIGN KEY ([ItemId])
    REFERENCES [dbo].[tblMasterItems]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_tblMasterDrawing_tblMasterItem'
CREATE INDEX [IX_FK_tblMasterDrawing_tblMasterItem]
ON [dbo].[tblMasterDrawings]
    ([ItemId]);
GO

-- Creating foreign key on [ItemCategory] in table 'tblMasterItems'
ALTER TABLE [dbo].[tblMasterItems]
ADD CONSTRAINT [FK_tblMasterItem_tblMasterItemCategory]
    FOREIGN KEY ([ItemCategory])
    REFERENCES [dbo].[tblMasterItemCategories]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_tblMasterItem_tblMasterItemCategory'
CREATE INDEX [IX_FK_tblMasterItem_tblMasterItemCategory]
ON [dbo].[tblMasterItems]
    ([ItemCategory]);
GO

-- Creating foreign key on [UOM] in table 'tblMasterItems'
ALTER TABLE [dbo].[tblMasterItems]
ADD CONSTRAINT [FK_tblMasterItem_tblMasterUnitOfMeasure]
    FOREIGN KEY ([UOM])
    REFERENCES [dbo].[tblMasterUnitOfMeasures]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_tblMasterItem_tblMasterUnitOfMeasure'
CREATE INDEX [IX_FK_tblMasterItem_tblMasterUnitOfMeasure]
ON [dbo].[tblMasterItems]
    ([UOM]);
GO

-- Creating foreign key on [ItemId] in table 'tblPurchaseItems'
ALTER TABLE [dbo].[tblPurchaseItems]
ADD CONSTRAINT [FK_tblPurchaseItem_tblMasterItem]
    FOREIGN KEY ([ItemId])
    REFERENCES [dbo].[tblMasterItems]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_tblPurchaseItem_tblMasterItem'
CREATE INDEX [IX_FK_tblPurchaseItem_tblMasterItem]
ON [dbo].[tblPurchaseItems]
    ([ItemId]);
GO

-- Creating foreign key on [ItemId] in table 'tblStocks'
ALTER TABLE [dbo].[tblStocks]
ADD CONSTRAINT [FK_tblStock_tblMasterItem]
    FOREIGN KEY ([ItemId])
    REFERENCES [dbo].[tblMasterItems]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_tblStock_tblMasterItem'
CREATE INDEX [IX_FK_tblStock_tblMasterItem]
ON [dbo].[tblStocks]
    ([ItemId]);
GO

-- Creating foreign key on [ItemId] in table 'tblStockCreditDetails'
ALTER TABLE [dbo].[tblStockCreditDetails]
ADD CONSTRAINT [FK_tblStockCreditDetails_tblMasterItem]
    FOREIGN KEY ([ItemId])
    REFERENCES [dbo].[tblMasterItems]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_tblStockCreditDetails_tblMasterItem'
CREATE INDEX [IX_FK_tblStockCreditDetails_tblMasterItem]
ON [dbo].[tblStockCreditDetails]
    ([ItemId]);
GO

-- Creating foreign key on [UOM] in table 'tblPurchaseItems'
ALTER TABLE [dbo].[tblPurchaseItems]
ADD CONSTRAINT [FK_tblPurchaseItem_tblMasterUnitOfMeasure]
    FOREIGN KEY ([UOM])
    REFERENCES [dbo].[tblMasterUnitOfMeasures]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_tblPurchaseItem_tblMasterUnitOfMeasure'
CREATE INDEX [IX_FK_tblPurchaseItem_tblMasterUnitOfMeasure]
ON [dbo].[tblPurchaseItems]
    ([UOM]);
GO

-- Creating foreign key on [UOM] in table 'tblStocks'
ALTER TABLE [dbo].[tblStocks]
ADD CONSTRAINT [FK_tblStock_tblMasterUnitOfMeasure]
    FOREIGN KEY ([UOM])
    REFERENCES [dbo].[tblMasterUnitOfMeasures]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_tblStock_tblMasterUnitOfMeasure'
CREATE INDEX [IX_FK_tblStock_tblMasterUnitOfMeasure]
ON [dbo].[tblStocks]
    ([UOM]);
GO

-- Creating foreign key on [VendorId] in table 'tblPurchases'
ALTER TABLE [dbo].[tblPurchases]
ADD CONSTRAINT [FK_tblPurchase_tblMasterVendor]
    FOREIGN KEY ([VendorId])
    REFERENCES [dbo].[tblMasterVendors]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_tblPurchase_tblMasterVendor'
CREATE INDEX [IX_FK_tblPurchase_tblMasterVendor]
ON [dbo].[tblPurchases]
    ([VendorId]);
GO

-- Creating foreign key on [MenuId] in table 'tblRoleMenus'
ALTER TABLE [dbo].[tblRoleMenus]
ADD CONSTRAINT [FK_tblRoleMenu_tblMenu]
    FOREIGN KEY ([MenuId])
    REFERENCES [dbo].[tblMenus]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_tblRoleMenu_tblMenu'
CREATE INDEX [IX_FK_tblRoleMenu_tblMenu]
ON [dbo].[tblRoleMenus]
    ([MenuId]);
GO

-- Creating foreign key on [PurchaseId] in table 'tblPurchaseItems'
ALTER TABLE [dbo].[tblPurchaseItems]
ADD CONSTRAINT [FK_tblPurchaseItem_tblPurchase]
    FOREIGN KEY ([PurchaseId])
    REFERENCES [dbo].[tblPurchases]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_tblPurchaseItem_tblPurchase'
CREATE INDEX [IX_FK_tblPurchaseItem_tblPurchase]
ON [dbo].[tblPurchaseItems]
    ([PurchaseId]);
GO

-- Creating foreign key on [RoleId] in table 'tblRoleMenus'
ALTER TABLE [dbo].[tblRoleMenus]
ADD CONSTRAINT [FK_tblRoleMenu_tblRole]
    FOREIGN KEY ([RoleId])
    REFERENCES [dbo].[tblRoles]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_tblRoleMenu_tblRole'
CREATE INDEX [IX_FK_tblRoleMenu_tblRole]
ON [dbo].[tblRoleMenus]
    ([RoleId]);
GO

-- Creating foreign key on [RoleId] in table 'tblRolePermissions'
ALTER TABLE [dbo].[tblRolePermissions]
ADD CONSTRAINT [FK_tblRolePermission_tblRole]
    FOREIGN KEY ([RoleId])
    REFERENCES [dbo].[tblRoles]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_tblRolePermission_tblRole'
CREATE INDEX [IX_FK_tblRolePermission_tblRole]
ON [dbo].[tblRolePermissions]
    ([RoleId]);
GO

-- Creating foreign key on [RoleId] in table 'tblUserRoles'
ALTER TABLE [dbo].[tblUserRoles]
ADD CONSTRAINT [FK_tblUserRole_tblRole]
    FOREIGN KEY ([RoleId])
    REFERENCES [dbo].[tblRoles]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_tblUserRole_tblRole'
CREATE INDEX [IX_FK_tblUserRole_tblRole]
ON [dbo].[tblUserRoles]
    ([RoleId]);
GO

-- Creating foreign key on [StoreCreditId] in table 'tblStockCreditDetails'
ALTER TABLE [dbo].[tblStockCreditDetails]
ADD CONSTRAINT [FK_tblStockCreditDetails_tblStoreCredit]
    FOREIGN KEY ([StoreCreditId])
    REFERENCES [dbo].[tblStoreCredits]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_tblStockCreditDetails_tblStoreCredit'
CREATE INDEX [IX_FK_tblStockCreditDetails_tblStoreCredit]
ON [dbo].[tblStockCreditDetails]
    ([StoreCreditId]);
GO

-- Creating foreign key on [intUnit] in table 'tblMasterBOMOperations'
ALTER TABLE [dbo].[tblMasterBOMOperations]
ADD CONSTRAINT [FK_tblMasterBOMOperation_tblMasterUnitOfMeasure]
    FOREIGN KEY ([intUnit])
    REFERENCES [dbo].[tblMasterUnitOfMeasures]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_tblMasterBOMOperation_tblMasterUnitOfMeasure'
CREATE INDEX [IX_FK_tblMasterBOMOperation_tblMasterUnitOfMeasure]
ON [dbo].[tblMasterBOMOperations]
    ([intUnit]);
GO

-- Creating foreign key on [lngLevelId] in table 'tblBillOfMaterialDetails'
ALTER TABLE [dbo].[tblBillOfMaterialDetails]
ADD CONSTRAINT [FK_tblBillOfMaterialDetail_tblMasterBOMLevel]
    FOREIGN KEY ([lngLevelId])
    REFERENCES [dbo].[tblMasterBOMLevels]
        ([lngId])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_tblBillOfMaterialDetail_tblMasterBOMLevel'
CREATE INDEX [IX_FK_tblBillOfMaterialDetail_tblMasterBOMLevel]
ON [dbo].[tblBillOfMaterialDetails]
    ([lngLevelId]);
GO

-- Creating foreign key on [lngItemId] in table 'tblBillOfMaterialDetails'
ALTER TABLE [dbo].[tblBillOfMaterialDetails]
ADD CONSTRAINT [FK_tblBillOfMaterialDetail_tblMasterItem]
    FOREIGN KEY ([lngItemId])
    REFERENCES [dbo].[tblMasterItems]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_tblBillOfMaterialDetail_tblMasterItem'
CREATE INDEX [IX_FK_tblBillOfMaterialDetail_tblMasterItem]
ON [dbo].[tblBillOfMaterialDetails]
    ([lngItemId]);
GO

-- Creating foreign key on [lngLevelId] in table 'tblBillOfMaterialDetails'
ALTER TABLE [dbo].[tblBillOfMaterialDetails]
ADD CONSTRAINT [FK_tblBillOfMaterialDetail_tblMasterUnitOfMeasure]
    FOREIGN KEY ([lngLevelId])
    REFERENCES [dbo].[tblMasterUnitOfMeasures]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_tblBillOfMaterialDetail_tblMasterUnitOfMeasure'
CREATE INDEX [IX_FK_tblBillOfMaterialDetail_tblMasterUnitOfMeasure]
ON [dbo].[tblBillOfMaterialDetails]
    ([lngLevelId]);
GO

-- Creating foreign key on [lngBOMId] in table 'tblBillOfMaterialDetails'
ALTER TABLE [dbo].[tblBillOfMaterialDetails]
ADD CONSTRAINT [FK_tblBillOfMaterial_tblBillOfMaterialDetail]
    FOREIGN KEY ([lngBOMId])
    REFERENCES [dbo].[tblBillOfMaterials]
        ([lngId])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_tblBillOfMaterial_tblBillOfMaterialDetail'
CREATE INDEX [IX_FK_tblBillOfMaterial_tblBillOfMaterialDetail]
ON [dbo].[tblBillOfMaterialDetails]
    ([lngBOMId]);
GO

-- Creating foreign key on [intDiagramId] in table 'tblBillOfMaterials'
ALTER TABLE [dbo].[tblBillOfMaterials]
ADD CONSTRAINT [FK_tblBillOfMaterial_tblMasterDrawing]
    FOREIGN KEY ([intDiagramId])
    REFERENCES [dbo].[tblMasterDrawings]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_tblBillOfMaterial_tblMasterDrawing'
CREATE INDEX [IX_FK_tblBillOfMaterial_tblMasterDrawing]
ON [dbo].[tblBillOfMaterials]
    ([intDiagramId]);
GO

-- Creating foreign key on [lngItemId] in table 'tblBillOfMaterials'
ALTER TABLE [dbo].[tblBillOfMaterials]
ADD CONSTRAINT [FK_tblBillOfMaterial_tblMasterItem]
    FOREIGN KEY ([lngItemId])
    REFERENCES [dbo].[tblMasterItems]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_tblBillOfMaterial_tblMasterItem'
CREATE INDEX [IX_FK_tblBillOfMaterial_tblMasterItem]
ON [dbo].[tblBillOfMaterials]
    ([lngItemId]);
GO

-- Creating foreign key on [intApprovedBy] in table 'tblBillOfMaterials'
ALTER TABLE [dbo].[tblBillOfMaterials]
ADD CONSTRAINT [FK_tblBillOfMaterial_tblUser_ApprovedBy]
    FOREIGN KEY ([intApprovedBy])
    REFERENCES [dbo].[tblUsers]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_tblBillOfMaterial_tblUser_ApprovedBy'
CREATE INDEX [IX_FK_tblBillOfMaterial_tblUser_ApprovedBy]
ON [dbo].[tblBillOfMaterials]
    ([intApprovedBy]);
GO

-- Creating foreign key on [intCreatedBy] in table 'tblBillOfMaterials'
ALTER TABLE [dbo].[tblBillOfMaterials]
ADD CONSTRAINT [FK_tblBillOfMaterial_tblUser_CreatedBy]
    FOREIGN KEY ([intCreatedBy])
    REFERENCES [dbo].[tblUsers]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_tblBillOfMaterial_tblUser_CreatedBy'
CREATE INDEX [IX_FK_tblBillOfMaterial_tblUser_CreatedBy]
ON [dbo].[tblBillOfMaterials]
    ([intCreatedBy]);
GO

-- Creating foreign key on [Id] in table 'tblMasterBins'
ALTER TABLE [dbo].[tblMasterBins]
ADD CONSTRAINT [FK_tblMasterBin_tblMasterBin]
    FOREIGN KEY ([Id])
    REFERENCES [dbo].[tblMasterBins]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating foreign key on [CityId] in table 'tblMasterLocations'
ALTER TABLE [dbo].[tblMasterLocations]
ADD CONSTRAINT [FK_tblMasterLocation_tblCity]
    FOREIGN KEY ([CityId])
    REFERENCES [dbo].[tblCities]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_tblMasterLocation_tblCity'
CREATE INDEX [IX_FK_tblMasterLocation_tblCity]
ON [dbo].[tblMasterLocations]
    ([CityId]);
GO

-- Creating foreign key on [LocationId] in table 'tblMasterBins'
ALTER TABLE [dbo].[tblMasterBins]
ADD CONSTRAINT [FK_tblMasterBin_tblMasterLocation]
    FOREIGN KEY ([LocationId])
    REFERENCES [dbo].[tblMasterLocations]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_tblMasterBin_tblMasterLocation'
CREATE INDEX [IX_FK_tblMasterBin_tblMasterLocation]
ON [dbo].[tblMasterBins]
    ([LocationId]);
GO

-- Creating foreign key on [intCustomerId] in table 'tblCustomerOrders'
ALTER TABLE [dbo].[tblCustomerOrders]
ADD CONSTRAINT [FK_tblCustomerOrder_tblMasterCustomer]
    FOREIGN KEY ([intCustomerId])
    REFERENCES [dbo].[tblMasterCustomers]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_tblCustomerOrder_tblMasterCustomer'
CREATE INDEX [IX_FK_tblCustomerOrder_tblMasterCustomer]
ON [dbo].[tblCustomerOrders]
    ([intCustomerId]);
GO

-- Creating foreign key on [intCustomerOrderId] in table 'tblCustomerOrderDetails'
ALTER TABLE [dbo].[tblCustomerOrderDetails]
ADD CONSTRAINT [FK_tblCustomerOrderDetails_tblCustomerOrder]
    FOREIGN KEY ([intCustomerOrderId])
    REFERENCES [dbo].[tblCustomerOrders]
        ([lngId])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_tblCustomerOrderDetails_tblCustomerOrder'
CREATE INDEX [IX_FK_tblCustomerOrderDetails_tblCustomerOrder]
ON [dbo].[tblCustomerOrderDetails]
    ([intCustomerOrderId]);
GO

-- Creating foreign key on [intItemId] in table 'tblCustomerOrderDetails'
ALTER TABLE [dbo].[tblCustomerOrderDetails]
ADD CONSTRAINT [FK_tblCustomerOrderDetails_tblMasterItem]
    FOREIGN KEY ([intItemId])
    REFERENCES [dbo].[tblMasterItems]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_tblCustomerOrderDetails_tblMasterItem'
CREATE INDEX [IX_FK_tblCustomerOrderDetails_tblMasterItem]
ON [dbo].[tblCustomerOrderDetails]
    ([intItemId]);
GO

-- Creating foreign key on [intItemId] in table 'tblProductionPlanDetails'
ALTER TABLE [dbo].[tblProductionPlanDetails]
ADD CONSTRAINT [FK_tblProductionPlanDetails_tblMasterItem]
    FOREIGN KEY ([intItemId])
    REFERENCES [dbo].[tblMasterItems]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_tblProductionPlanDetails_tblMasterItem'
CREATE INDEX [IX_FK_tblProductionPlanDetails_tblMasterItem]
ON [dbo].[tblProductionPlanDetails]
    ([intItemId]);
GO

-- Creating foreign key on [intSFNumber] in table 'tblProductionPlans'
ALTER TABLE [dbo].[tblProductionPlans]
ADD CONSTRAINT [FK_tblProductionPlan_tblSalesForcast]
    FOREIGN KEY ([intSFNumber])
    REFERENCES [dbo].[tblSalesForcasts]
        ([lngId])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_tblProductionPlan_tblSalesForcast'
CREATE INDEX [IX_FK_tblProductionPlan_tblSalesForcast]
ON [dbo].[tblProductionPlans]
    ([intSFNumber]);
GO

-- Creating foreign key on [intPPId] in table 'tblProductionPlanDetails'
ALTER TABLE [dbo].[tblProductionPlanDetails]
ADD CONSTRAINT [FK_tblProductionPlanDetails_tblProductionPlan]
    FOREIGN KEY ([intPPId])
    REFERENCES [dbo].[tblProductionPlans]
        ([lngid])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_tblProductionPlanDetails_tblProductionPlan'
CREATE INDEX [IX_FK_tblProductionPlanDetails_tblProductionPlan]
ON [dbo].[tblProductionPlanDetails]
    ([intPPId]);
GO

-- Creating foreign key on [intProductionPlanDetailsId] in table 'tblProductionPlanSchedules'
ALTER TABLE [dbo].[tblProductionPlanSchedules]
ADD CONSTRAINT [FK_tblProductionPlanSchedule_tblProductionPlanDetails]
    FOREIGN KEY ([intProductionPlanDetailsId])
    REFERENCES [dbo].[tblProductionPlanDetails]
        ([lngId])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_tblProductionPlanSchedule_tblProductionPlanDetails'
CREATE INDEX [IX_FK_tblProductionPlanSchedule_tblProductionPlanDetails]
ON [dbo].[tblProductionPlanSchedules]
    ([intProductionPlanDetailsId]);
GO

-- Creating foreign key on [lngItemId] in table 'tblWorkOrderDetails'
ALTER TABLE [dbo].[tblWorkOrderDetails]
ADD CONSTRAINT [FK_tblWorkOrderDetail_tblMasterItem]
    FOREIGN KEY ([lngItemId])
    REFERENCES [dbo].[tblMasterItems]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_tblWorkOrderDetail_tblMasterItem'
CREATE INDEX [IX_FK_tblWorkOrderDetail_tblMasterItem]
ON [dbo].[tblWorkOrderDetails]
    ([lngItemId]);
GO

-- Creating foreign key on [LocationId] in table 'tblMasterLocationContacts'
ALTER TABLE [dbo].[tblMasterLocationContacts]
ADD CONSTRAINT [FK_tblMasterLocationContact_tblMasterLocation]
    FOREIGN KEY ([LocationId])
    REFERENCES [dbo].[tblMasterLocations]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_tblMasterLocationContact_tblMasterLocation'
CREATE INDEX [IX_FK_tblMasterLocationContact_tblMasterLocation]
ON [dbo].[tblMasterLocationContacts]
    ([LocationId]);
GO

-- Creating foreign key on [EmployeeId] in table 'tblMasterLocationContacts'
ALTER TABLE [dbo].[tblMasterLocationContacts]
ADD CONSTRAINT [FK_tblMasterLocationContact_tblUser]
    FOREIGN KEY ([EmployeeId])
    REFERENCES [dbo].[tblUsers]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_tblMasterLocationContact_tblUser'
CREATE INDEX [IX_FK_tblMasterLocationContact_tblUser]
ON [dbo].[tblMasterLocationContacts]
    ([EmployeeId]);
GO

-- Creating foreign key on [intBOMId] in table 'tblWorkOrders'
ALTER TABLE [dbo].[tblWorkOrders]
ADD CONSTRAINT [FK_tblWorkOrder_tblBillOfMaterial]
    FOREIGN KEY ([intBOMId])
    REFERENCES [dbo].[tblBillOfMaterials]
        ([lngId])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_tblWorkOrder_tblBillOfMaterial'
CREATE INDEX [IX_FK_tblWorkOrder_tblBillOfMaterial]
ON [dbo].[tblWorkOrders]
    ([intBOMId]);
GO

-- Creating foreign key on [intCustomerOrderId] in table 'tblWorkOrders'
ALTER TABLE [dbo].[tblWorkOrders]
ADD CONSTRAINT [FK_tblWorkOrder_tblCustomerOrder]
    FOREIGN KEY ([intCustomerOrderId])
    REFERENCES [dbo].[tblCustomerOrders]
        ([lngId])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_tblWorkOrder_tblCustomerOrder'
CREATE INDEX [IX_FK_tblWorkOrder_tblCustomerOrder]
ON [dbo].[tblWorkOrders]
    ([intCustomerOrderId]);
GO

-- Creating foreign key on [intDepartmentId] in table 'tblWorkOrders'
ALTER TABLE [dbo].[tblWorkOrders]
ADD CONSTRAINT [FK_tblWorkOrder_tblMasterDepartment]
    FOREIGN KEY ([intDepartmentId])
    REFERENCES [dbo].[tblMasterDepartments]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_tblWorkOrder_tblMasterDepartment'
CREATE INDEX [IX_FK_tblWorkOrder_tblMasterDepartment]
ON [dbo].[tblWorkOrders]
    ([intDepartmentId]);
GO

-- Creating foreign key on [lngItemId] in table 'tblWorkOrders'
ALTER TABLE [dbo].[tblWorkOrders]
ADD CONSTRAINT [FK_tblWorkOrder_tblMasterItem1]
    FOREIGN KEY ([lngItemId])
    REFERENCES [dbo].[tblMasterItems]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_tblWorkOrder_tblMasterItem1'
CREATE INDEX [IX_FK_tblWorkOrder_tblMasterItem1]
ON [dbo].[tblWorkOrders]
    ([lngItemId]);
GO

-- Creating foreign key on [intProductionPlanId] in table 'tblWorkOrders'
ALTER TABLE [dbo].[tblWorkOrders]
ADD CONSTRAINT [FK_tblWorkOrder_tblProductionPlan]
    FOREIGN KEY ([intProductionPlanId])
    REFERENCES [dbo].[tblProductionPlans]
        ([lngid])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_tblWorkOrder_tblProductionPlan'
CREATE INDEX [IX_FK_tblWorkOrder_tblProductionPlan]
ON [dbo].[tblWorkOrders]
    ([intProductionPlanId]);
GO

-- Creating foreign key on [intSalesForecastId] in table 'tblWorkOrders'
ALTER TABLE [dbo].[tblWorkOrders]
ADD CONSTRAINT [FK_tblWorkOrder_tblSalesForcast]
    FOREIGN KEY ([intSalesForecastId])
    REFERENCES [dbo].[tblSalesForcasts]
        ([lngId])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_tblWorkOrder_tblSalesForcast'
CREATE INDEX [IX_FK_tblWorkOrder_tblSalesForcast]
ON [dbo].[tblWorkOrders]
    ([intSalesForecastId]);
GO

-- Creating foreign key on [intCreatedBy] in table 'tblWorkOrders'
ALTER TABLE [dbo].[tblWorkOrders]
ADD CONSTRAINT [FK_tblWorkOrder_tblUser]
    FOREIGN KEY ([intCreatedBy])
    REFERENCES [dbo].[tblUsers]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_tblWorkOrder_tblUser'
CREATE INDEX [IX_FK_tblWorkOrder_tblUser]
ON [dbo].[tblWorkOrders]
    ([intCreatedBy]);
GO

-- Creating foreign key on [intApprovedBy] in table 'tblWorkOrders'
ALTER TABLE [dbo].[tblWorkOrders]
ADD CONSTRAINT [FK_tblWorkOrder_tblUser1]
    FOREIGN KEY ([intApprovedBy])
    REFERENCES [dbo].[tblUsers]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_tblWorkOrder_tblUser1'
CREATE INDEX [IX_FK_tblWorkOrder_tblUser1]
ON [dbo].[tblWorkOrders]
    ([intApprovedBy]);
GO

-- Creating foreign key on [intAssignedTo] in table 'tblWorkOrders'
ALTER TABLE [dbo].[tblWorkOrders]
ADD CONSTRAINT [FK_tblWorkOrder_tblUser2]
    FOREIGN KEY ([intAssignedTo])
    REFERENCES [dbo].[tblUsers]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_tblWorkOrder_tblUser2'
CREATE INDEX [IX_FK_tblWorkOrder_tblUser2]
ON [dbo].[tblWorkOrders]
    ([intAssignedTo]);
GO

-- Creating foreign key on [lngWOId] in table 'tblWorkOrderDetails'
ALTER TABLE [dbo].[tblWorkOrderDetails]
ADD CONSTRAINT [FK_tblWorkOrderDetail_tblWorkOrder]
    FOREIGN KEY ([lngWOId])
    REFERENCES [dbo].[tblWorkOrders]
        ([lngId])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_tblWorkOrderDetail_tblWorkOrder'
CREATE INDEX [IX_FK_tblWorkOrderDetail_tblWorkOrder]
ON [dbo].[tblWorkOrderDetails]
    ([lngWOId]);
GO

-- --------------------------------------------------
-- Script has ended
-- --------------------------------------------------