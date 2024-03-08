using GAB2018.Web.DataObjects;
using GAB2018.Web.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace GAB2018.Web.Controllers
{
    public class AdminController : Controller
    {
        private GABMauritiusContext context = new GABMauritiusContext();

        public ActionResult Index()
        {
            return View(context.Sessions.ToList().OrderBy(e => e.Start));
        }

        public ActionResult Speaker(string id)
        {
            if (id == null) return HttpNotFound();

            var speaker = context.Speakers.Find(id);
            if (speaker == null) return HttpNotFound();

            return View(speaker);
        }

        public ActionResult Add()
        {
            ViewBag.Speakers = context.Speakers.ToList();
            return View();
        }

        [HttpPost]
        public async Task<ActionResult> Add(Session model)
        {
            if (ModelState.IsValid)
            {
                model.Id = Guid.NewGuid().ToString();
                context.Sessions.Add(model);
                await context.SaveChangesAsync();

                return RedirectToAction(nameof(Index));
            }

            return View(model);
        }

        public ActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public async Task<ActionResult> Create(Speaker model)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    model.Id = Guid.NewGuid().ToString();
                    context.Speakers.Add(model);
                    await context.SaveChangesAsync();

                    return RedirectToAction(nameof(Index));
                }
                catch (Exception e)
                {
                    Debug.WriteLine(e.Message);
                }
            }

            return View(model);
        }
    }
}