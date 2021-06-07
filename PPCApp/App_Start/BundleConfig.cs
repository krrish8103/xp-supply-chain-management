using System.Web;
using System.Web.Optimization;

namespace PPCApp
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/Content/Angular/Scripts")
               .Include("~/Content/Angular/Scripts/socket.io.js")
                .Include("~/Content/Angular/Scripts/jquery-1.10.2.min.js")
               .Include("~/Content/Angular/Scripts/jquery-ui.js")
                .Include("~/Content/Angular/Scripts/bootstrap.min.js")
                .Include("~/Content/Angular/Scripts/angular.min.js")
                .Include("~/Content/Angular/Scripts/angular-route.js")
                .Include("~/Content/Angular/Scripts/angular-resource.js")
                 .Include("~/Content/Angular/Scripts/ui-bootstrap-tpls-0.11.0.js")
                .Include("~/Content/Angular/Scripts/moment.min.js")
                .Include("~/Content/Angular/Scripts/readable-range.js")
                .Include("~/Content/Angular/Scripts/datetimepicker.js")
                .Include("~/Content/Angular/Scripts/ps-input-time.js")
                .Include("~/Content/Angular/Scripts/ng-grid.min.js")
                .Include("~/Content/Angular/Scripts/angular-local-storage.min.js")
                .Include("~/Content/Angular/Scripts/angular-strap.min.js")
                .Include("~/Content/Angular/Scripts/angular-strap.tpl.min.js")
                .Include("~/Content/Angular/Scripts/smart-table.min.js")
                .Include("~/Content/Angular/Scripts/angular-base64.min.js")
                .Include("~/Content/Angular/Scripts/sweet-alert.min.js")
                .Include("~/Content/Angular/Scripts/loading-bar.min.js")
                .Include("~/Content/Angular/Scripts/angular-block-ui.min.js")
                .Include("~/Content/Angular/Scripts/angular-animate.min.js")
                .Include("~/Content/Angular/Scripts/angular-idle.min.js")
                .Include("~/Content/Angular/Scripts/Chart.min.js")
                .Include("~/Content/Angular/Scripts/angular-chart.min.js")
                  .Include("~/Content/Angular/ScriptstextAngular-sanitize.min.js")
                  .Include("~/Content/Angular/Scripts/textAngular.min.js")
                  .Include("~/Content/Angular/Scripts/customSelect.js")
                  .Include("~/Content/Angular/Scripts/elastic.js")
                 .Include("~/Content/Angular/Scripts/angular-bootstrap-toggle.min.js")
                 .Include("~/Content/Angular/Scripts/ridge-speedometer.js")
.Include("~/Content/Angular/Scripts/ng-lodash.js")               
                .Include("~/Content/Angular/Scripts/angular-cookies.js")
                .Include("~/Content/Angular/Scripts/angular-sanitize.js")
                 .Include("~/Content/Angular/Scripts/ngStorage.min.js")
                );


            bundles.Add(new ScriptBundle("~/PPCAppFiles/app")
                .Include("~/PPCFiles/app.js")
                .Include("~/PPCFiles/Constant.js")
                .Include("~/PPCFiles/Controller/loginController.js")
                .Include("~/PPCFiles/Controller/headerController.js")

                .Include("~/PPCFiles/Controller/masterController.js")
                .Include("~/PPCFiles/Controller/ProdPlan/workOrderController.js")
                .Include("~/PPCFiles/Controller/ProdPlan/ProductionPlanController.js")
                .Include("~/PPCFiles/Controller/Procurement/quotationController.js")
                .Include("~/PPCFiles/Controller/WareHouse/StoresCreditNoteController.js")
                 .Include("~/PPCFiles/Controller/WareHouse/MaterialReturnNoteController.js")
                 .Include("~/PPCFiles/Controller/UserSpecific/mailCommunicationController.js")
                .Include("~/PPCFiles/Controller/Procurement/purchaseOrderController.js")
                .Include("~/PPCFiles/Controller/JavaScript.js")

                .Include("~/PPCFiles/Service/authInterceptorService.js")
                .Include("~/PPCFiles/Service/loginService.js")
                .Include("~/PPCFiles/Service/masterService.js")
                .Include("~/PPCFiles/Service/ProdPlan/workOrderService.js")
                .Include("~/PPCFiles/Service/ProdPlan/ProductionPlanService.js")
                .Include("~/PPCFiles/Service/Procurement/quotationService.js")
                .Include("~/PPCFiles/Service/WareHouse/StoresCreditNoteService.js")
                .Include("~/PPCFiles/Service/WareHouse/MaterialReturnNoteService.js")
                .Include("~/PPCFiles/Service/UserSpecific/mailCommunicationService.js")
                .Include("~/PPCFiles/Service/Procurement/purchaseOrderService.js")

                .Include("~/PPCFiles/Model/userModel.js")
                 .Include("~/PPCFiles/Controller/machineDashboardController.js")
                 .Include("~/PPCFiles/Controller/plantViewDashboardController.js")


                 );

            bundles.Add(new StyleBundle("~/Content/Styles/css")
                //.Include("~/Content/Angular/Styles/bootstrap.min.css")
                //.Include("~/Content/Angular/Styles/font-awesome.css")
                //.Include("~/Content/Angular/Styles/customStyles.css")
                .Include("~/Content/Site.css")
                .Include("~/Content/Angular/Styles/ng-grid.min.css")
                .Include("~/Content/Angular/Styles/angular-motion.min.css")
                .Include("~/Content/Angular/Styles/sweet-alert.css")
                .Include("~/Content/Angular/Styles/angular-chart.css")
                .Include("~/Content/Angular/Styles/loading-bar.css")
                .Include("~/Content/Angular/Styles/angular-block-ui.css")
                .Include("~/Content/Angular/Styles/popover.css")
                .Include("~/Content/Angular/Styles/datepicker.css")
                .Include("~/Content/Angular/Styles/angular-chart.min.css")
                .Include("~/Content/Angular/Styles/customSelect.css")
                .Include("~/Content/Angular/Styles/angular-bootstrap-toggle.min.css")


                );



        }
    }
}
