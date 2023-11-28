<?php include("includes/init.php");?>
<!doctype html>
<html lang="en" dir="ltr">
   <head>
      <?php include("includes/header.php");?>
   </head>
   <body class="app ltr light-mode horizontal" cz-shortcut-listen="true">
      <div class="horizontalMenucontainer">
         <div class="horizontalMenucontainer">
            <!-- GLOBAL-LOADER -->
            <div id="global-loader" style="display: none;">
               <img src="assets/images/loader.svg" class="loader-img" alt="Loader">
            </div>
            <!-- /GLOBAL-LOADER -->
            <!-- PAGE -->
            <div class="page">
               <div class="page-main">
                  <!-- app-Header -->
                  <?php include("includes/app_header.php");?>
                  <!-- /app-Header -->
                  <!--APP-SIDEBAR-->
               
                  <!--/APP-SIDEBAR-->
                  <!--app-content open-->
                  <div class="main-content mt-0 hor-content" style="padding-top: 0px;">
                     <div class="side-app">
                        <!-- CONTAINER -->
                        <div class="main-container container">
                           <!-- PAGE-HEADER -->
                           <?php include("includes/page_header.php");?>
                           <!-- PAGE-HEADER END -->
                           <!-- ROW-GERAL OPEN -->
                           <?php include("includes/filter.php");?>
                           <?php include("includes/info.php");?>
                           <!-- ROW-GERAL CLOSE -->
                           <!-- ROW-1 OPEN -->
                           <?php include("includes/chart.php");?>
                           <!-- ROW-1 CLOSE -->
                        </div>
                        <!-- CONTAINER CLOSE -->
                     </div>
                  </div>
                  <!--app-content closed-->
               </div>
               <!-- Sidebar-right -->
               <?php include("includes/sidebar_right.php");?>
               <!--/Sidebar-right-->
               <!-- Country-selector modal-->
               <?php include("includes/lang.php");?>
               <!-- Country-selector modal-->
               <!-- citar-selector modal-->
               <?php include("includes/citation.php");?>               
            </div>
            <!-- Country-selector modal-->
            <!-- FOOTER -->
            <?php include("includes/footer.php");?>
            <!-- FOOTER CLOSED -->
         </div>
         <!-- BACK-TO-TOP -->
         <a href="#top" id="back-to-top" style="display: none;"><i class="fa fa-angle-up"></i></a>    
         <?php include("includes/js.php");?>
      </div>
      <scribe-shadow id="crxjs-ext" style="position: fixed; width: 0px; height: 0px; top: 0px; left: 0px; z-index: 2147483647; overflow: visible;"></scribe-shadow>
   </body>
</html>