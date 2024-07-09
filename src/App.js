import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './auth/Login';
import Protected from './auth/Protected';
import Signup from './auth/Signup';
import Home from './Home';
import Sidebar from './component/sidebar/Sidebar';
import Party from './component/party/Party';
import SupplyChainPartner from './component/supplychainpartner/SupplyChainPartner';
import Gst from './component/gst/Gst';
import Tds from './component/tds/Tds';
import Route1 from './component/route/Route1';
import Station from './component/station/Station';
import LoadType from './component/loadtype/LoadType';
import VehicleModel from './component/vehiclemodel/VehicleModel';
import Vehicle from './component/vehicle/Vehicle';
import CommodityGroup from './component/commoditygroup/CommodityGroup';
import Content from './component/content/Content';
import Checklist from './component/checklist/Checklist';
import Country from './component/country/Country';
import State from './component/state/State';
import City from './component/city/City';
import Area from './component/area/Area';
import Zone from './component/zone/Zone';
import Department from './component/department/Department';
import RateZone from './component/ratezone/RateZone';
import Currency from './component/currency/Currency';
import Zipcode from './component/zipcode/Zipcode';
import Unit from './component/unit/Unit';
import PartyReport from './component/partyreport/PartyReport';
import BranchReport from './component/branchreport/BranchReport';
import StationReport from './component/stationreport/StationReport';
import GodownReport from './component/godownreport/GodownReport';
import ContentReport from './component/contentreport/ContentReport';
import VehicleReport from './component/vehiclereport/VehicleReport';
import DriverReport from './component/driverreport/DriverReport';
import BrokerReport from './component/brokerreport/BrokerReport';

import Sidebarop from './componentop/sidebarop/Sidebarop';
import Rateslab from './componentop/rateslab/Rateslab';
import Freightrate from './componentop/freightrate/Freightrate';
import ViewFreightRates from './componentop/freightrate/ViewFreightRates';
import DocumentIssue from './componentop/documentissue/DocumentIssue';
import DocumentCancel from './componentop/documentcancel/DocumentCancel';
import Indent from './componentop/indent/Indent';
import ViewIndents from './componentop/indent/ViewIndents';
import UpdateIndent from './componentop/indent/UpdateIndent';
import JobOrder from './componentop/joborder/JobOrder';
import ViewJobOrders from './componentop/joborder/ViewJobOrders';
import UpdateJobOrder from './componentop/joborder/UpdateJobOrder';
import VehiclePlacement from './componentop/vehicleplacement/VehiclePlacement';
import AddNewDataInJobOrder from './componentop/joborder/AddNewDataInJobOrder.js';
import ViewVehiclePlacement from './componentop/vehicleplacement/ViewVehiclePlacement.js';
import UpdateVehiclePlacement from './componentop/vehicleplacement/UpdateVehiclePlacement.js';
import Consignment from './componentop/consignment/Consignment';
import VehicleHire from './componentop/vehiclehire/VehicleHire';
import Unloading from './componentop/unloading/Unloading';
import Pod from './componentop/pod/Pod';
import ByConsignment from './componentop/byconsignment/ByConsignment';
import Multiple from './componentop/multiple/Multiple';
import Bill from './componentop/bill/Bill';
import RegisterReport from './componentop/registerreport/RegisterReport';
import AnalysisReport from './componentop/analysisreport/AnalysisReport';
import StockReport from './componentop/stockreport/StockReport';
import MisReport from './componentop/misreport/MisReport';
import PendingReport from './componentop/pendingreport/PendingReport';
import CostingReport from './componentop/costingreport/CostingReport';

import Sidebarac from './componentac/sidebarac/Sidebarac';
import Groups from './componentac/groups/Groups';
import Account from './componentac/account/Account';
import Type from './componentac/type/Type';
import OpeningBlance from './componentac/openingblance/OpeningBlance';
import Cheque from './componentac/cheque/Cheque';
import ReceiptVoucher from './componentac/receiptvoucher/ReceiptVoucher';
import PaymentVoucher from './componentac/paymentvoucher/PaymentVoucher';
import BillPassing from './componentac/billpassing/BillPassing';
import ContraVoucher from './componentac/contravoucher/ContraVoucher';
import JournalVoucher from './componentac/journalvoucher/JournalVoucher';
import BillDeducation from './componentac/billdeduction/BillDeducation';
import ChequeDeposit from './componentac/chequedeposit/ChequeDeposit';
import BillAc from './componentac/billac/BillAc.js';
import NonFreightbill from './componentac/nonfreightbill/NonFreightbill';
import BillSubmission from './componentac/billsubmission/BillSubmission';
import BankReconciliation from './componentac/bankreconciliation/BankReconciliation';
import PIbr from './componentac/pandingibr/PIbr.js';
import Branchreconciliation from './componentac/branchreconciliation/Branchreconciliation.js';
import AddToJoborder from './componentop/vehicleplacement/AddToJoborder.js';
import ViewConsignment from './componentop/consignment/ViewConsignment.js';
import UpdateConsignment from './componentop/consignment/UpdateConsignment.js';
import AddNewDataInConsignment from './componentop/consignment/AddNewDataInConsignment.js';
import ViewVehicleHire from './componentop/vehiclehire/ViewVehicleHire.js';
import UpdateVehicleHire from './componentop/vehiclehire/UpdateVehicleHire.js';
import ViewPod from './componentop/pod/ViewPod.js';
import UpdatePod from './componentop/pod/UpdatePod.js';
import ViewBillAc from './componentac/billac/ViewBillAc.js';
import UpdateBillAc from './componentac/billac/UpdateBillAc.js';



function App() {
  const isLoggedIn = localStorage.getItem('token'); // Assuming you store user information in localStorage
  const username = localStorage.getItem('username');

  return (
    <Router>
    
      <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate to="/protected" /> : <Login />} />
        <Route path="/protected" element={<Protected username={username} Component={Home} />}></Route>
          {isLoggedIn ? (
            <>
        
            <Route path="protected/component/sidebar/Sidebar" element={<Protected Component={Sidebar} />} >
              <Route path="parties">
                <Route path="party" element={<Protected Component={Party} />} />
                <Route path="supplychainpartner" element={<Protected Component={SupplyChainPartner} />} />
              </Route>

              <Route path="taxes">
                <Route path="gst" element={<Protected Component={Gst} />} />
                <Route path="tds" element={<Protected Component={Tds} />} />
              </Route>

              <Route path="generalmaster">
                <Route path="route" element={<Protected Component={Route1} />} />
                <Route path="station" element={<Protected Component={Station} />} />
                <Route path="loadtype" element={<Protected Component={LoadType} />} />
                <Route path="vehiclemodel" element={<Protected Component={VehicleModel} />} />
                <Route path="vehicle" element={<Protected Component={Vehicle} />} />
              </Route>

              <Route path="warehouse">
                <Route path="comoditygroup" element={<Protected Component={CommodityGroup} />} />
                <Route path="content" element={<Protected Component={Content} />} />
                <Route path="checklist" element={<Protected Component={Checklist} />} />
              </Route>

              <Route path="miscellaneous">
                <Route path="country" element={<Protected Component={Country} />} />
                <Route path="state" element={<Protected Component={State} />} />
                <Route path="city" element={<Protected Component={City} />} />
                <Route path="area" element={<Protected Component={Area} />} />
                <Route path="zone" element={<Protected Component={Zone} />} />
                <Route path="department" element={<Protected Component={Department} />} />
                <Route path="ratezone" element={<Protected Component={RateZone} />} />
                <Route path="currency" element={<Protected Component={Currency} />} />
                <Route path="zipcode" element={<Protected Component={Zipcode} />} />
                <Route path="unit" element={<Protected Component={Unit} />} />
              </Route>

              <Route path="listreports">
                <Route path="partyreport" element={<Protected Component={PartyReport} />} />
                <Route path="branchreport" element={<Protected Component={BranchReport} />} />
                <Route path="stationreport" element={<Protected Component={StationReport} />} />
                <Route path="godownreport" element={<Protected Component={GodownReport} />} />
                <Route path="contentreport" element={<Protected Component={ContentReport} />} />
                <Route path="vehiclereport" element={<Protected Component={VehicleReport} />} />
                <Route path="driverreport" element={<Protected Component={DriverReport} />} />
                <Route path="brokerreport" element={<Protected Component={BrokerReport} />} />
              </Route>

            </Route>

            <Route path="protected/componentop/sidebarop/Sidebarop" element={<Protected Component={Sidebarop} />}>
              <Route path="contract">
                <Route path="rateslab" element={<Protected Component={Rateslab} />} />
                <Route path="freightrate" element={<Protected Component={Freightrate} />} />
                <Route path="viewfreightrates" element={<Protected Component={ViewFreightRates} />} />
              </Route>

              <Route path="managedocument">
                <Route path="documentissue" element={<Protected Component={DocumentIssue} />} />
                <Route path="documentcancel" element={<Protected Component={DocumentCancel} />} />
              </Route>

              <Route path="ordermanagement">
                <Route path="indent" element={<Protected Component={Indent} />} />
                <Route path="viewindents" element={<Protected Component={ViewIndents} />} />
                <Route path="updateindent/:id" element={<Protected Component={UpdateIndent} />} />
                <Route path="joborder" element={<Protected Component={JobOrder} />} />
                <Route path="viewjoborders" element={<Protected Component={ViewJobOrders} />} />
                <Route path="updateJobOrder/:id" element={<Protected Component={UpdateJobOrder} />} />
                <Route path="AddNewDataInJobOrder/:id" element={<Protected Component={AddNewDataInJobOrder} />} />
                <Route path="vahicleplacement" element={<Protected Component={VehiclePlacement} />} />
                <Route path="viewvahicleplacement" element={<Protected Component={ViewVehiclePlacement} />} />
                <Route path="updateVehiclePlacement/:id" element={<Protected Component={UpdateVehiclePlacement} />} />
                <Route path="AddToJoborder/:id" element={<Protected Component={AddToJoborder} />} />
              </Route>

              <Route path="bookingoperation">
               <Route path="consignment" element={<Protected Component={Consignment} />}/>
               <Route path="viewconsignment" element={<Protected Component={ViewConsignment} />}/>
               <Route path="updateconsignment/:id" element={<Protected Component={UpdateConsignment} />}/>
               <Route path="AddNewDataInConsignment/:id" element={<Protected Component={AddNewDataInConsignment} />}/>
               <Route path="vehiclehire" element={<Protected Component={VehicleHire} />}/>
               <Route path="viewvehiclehire" element={<Protected Component={ViewVehicleHire} />}/>
               <Route path="updatevehiclehire/:id" element={<Protected Component={UpdateVehicleHire} />}/>
              </Route>

              <Route path="deliveryoperation">
               <Route path="unloading" element={<Protected Component={Unloading} />}/>
               <Route path="pod" element={<Protected Component={Pod} />}/>
               <Route path="viewpod" element={<Protected Component={ViewPod} />}/>
               <Route path="updatepod/:id" element={<Protected Component={UpdatePod} />}/>
              </Route>

              <Route path="enquiry">
                <Route path="byconsignment" element={<Protected Component={ByConsignment} />} />
                <Route path="multiple" element={<Protected Component={Multiple} />} />
                <Route path="bill" element={<Protected Component={Bill} />} />
              </Route>


              <Route path="reports">
                <Route path="registerreport" element={<Protected Component={RegisterReport} />} />
                <Route path="analysisreport" element={<Protected Component={AnalysisReport} />} />
                <Route path="stockreport" element={<Protected Component={StockReport} />} />
                <Route path="misreport" element={<Protected Component={MisReport} />} />
                <Route path="pendingreport" element={<Protected Component={PendingReport} />} />
                <Route path="costingreport" element={<Protected Component={CostingReport} />} />
              </Route>

            </Route>


            <Route path="protected/componentac/sidebarac/Sidebarac" element={<Protected Component={Sidebarac} />}>
            <Route path="master">
               <Route path="groups" element={<Protected Component={Groups} />}/>
               <Route path="account" element={<Protected Component={Account} />}/>
               <Route path="type" element={<Protected Component={Type} />}/>
               <Route path="openingbalance" element={<Protected Component={OpeningBlance} />}/>
               <Route path="cheque" element={<Protected Component={Cheque} />}/>
            </Route>
            <Route path="voucher">
               <Route path="receiptvoucher" element={<Protected Component={ReceiptVoucher} />}/>
               <Route path="paymentvoucher" element={<Protected Component={PaymentVoucher} />}/>
               <Route path="billpassing" element={<Protected Component={BillPassing} />}/>
               <Route path="contravoucher" element={<Protected Component={ContraVoucher} />}/>
               <Route path="journalvoucher" element={<Protected Component={JournalVoucher} />}/>
               <Route path="billdeduction" element={<Protected Component={BillDeducation} />}/>
               <Route path="chequedeposit" element={<Protected Component={ChequeDeposit} />}/>
           
            </Route>
            <Route path="billing">
               <Route path="bill" element={<Protected Component={BillAc} />}/>
               <Route path="viewbill" element={<Protected Component={ViewBillAc} />}/>
               <Route path="updateBill/:id" element={<Protected Component={UpdateBillAc} />}/>
               <Route path="nonfreightbill" element={<Protected Component={NonFreightbill} />}/>
               <Route path="billsubmission" element={<Protected Component={BillSubmission} />}/>
            </Route>
            <Route path="reconciliation">
               <Route path="bankreconciliation" element={<Protected Component={BankReconciliation} />}/>
               <Route path="pandingibr" element={<Protected Component={PIbr} />}/>
               <Route path="branchreconciliation" element={<Protected Component={Branchreconciliation} />}/>
              
            </Route>

              </Route>
              <Route path="billing">
                <Route path="bill" element={<Protected Component={BillAc} />} />
                <Route path="nonfreightbill" element={<Protected Component={NonFreightbill} />} />
                <Route path="billsubmission" element={<Protected Component={BillSubmission} />} />
              </Route>
              <Route path="reconciliation">
                <Route path="bankreconciliation" element={<Protected Component={BankReconciliation} />} />
                <Route path="pandingibr" element={<Protected Component={PIbr} />} />
                <Route path="branchreconciliation" element={<Protected Component={Branchreconciliation} />} />

              </Route>

          

            {/* 
              <Route path="component2" element={<Protected Component={Component2} />} />
              <Route path="component3" element={<Component3 />} /> */}

            {/* <Route path="component3" element={<Protected Component={Component3} />} /> */}
          </>
        ) : (
          <>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </>
        )}

      </Routes>
    </Router>
  );
}
export default App;


