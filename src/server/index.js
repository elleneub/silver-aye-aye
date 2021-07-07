import * as publicUiFunctions from './ui';
import * as publicSheetFunctions from './sheets';

// Expose public functions by attaching to `global`
global.doGet = publicUiFunctions.doGet;
// global.onOpen = publicUiFunctions.onOpen;
// global.openDialog = publicUiFunctions.openDialog;
// global.openDialogBootstrap = publicUiFunctions.openDialogBootstrap;
// global.openAboutSidebar = publicUiFunctions.openAboutSidebar;
global.onEdit = publicSheetFunctions.onEdit;
global.getSheetsData = publicSheetFunctions.getSheetsData;
global.getSheetValues = publicSheetFunctions.getSheetValues;
global.addSheet = publicSheetFunctions.addSheet;
global.deleteSheet = publicSheetFunctions.deleteSheet;
global.setActiveSheet = publicSheetFunctions.setActiveSheet;
