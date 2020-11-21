using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using static TrabajoIntento1.SqlHelper;

namespace TrabajoIntento1.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public string GetData()
        {
            string rpta = SqlHelper.EjecutarProcedimiento(enCnx.GameStore,
                        $"USP_Producto");
            return rpta;
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}