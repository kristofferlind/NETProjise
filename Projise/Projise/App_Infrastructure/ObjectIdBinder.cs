using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http.Controllers;
using System.Web.Http.ModelBinding;
//using System.Web.Mvc;
//using System.Web.Http.ModelBinding;
//using System.Web.ModelBinding;

namespace Projise.App_Infrastructure
{
    public class ObjectIdBinder : IModelBinder
    {
        //public object BindModel(ControllerContext controllerContext, ModelBindingContext bindingContext)
        //{
        //    var result = bindingContext.ValueProvider.GetValue(bindingContext.ModelName);
        //    return new ObjectId(result.AttemptedValue);
        //    //return ObjectId.Parse(result.AttemptedValue);
        //}
        //public object BindModel(ModelBindingExecutionContext modelBindingExecutionContext, ModelBindingContext bindingContext)
        //{
        //    var result = bindingContext.ValueProvider.GetValue(bindingContext.ModelName);
        //    return new ObjectId(result.AttemptedValue);
        //}
        public bool BindModel(HttpActionContext actionContext, ModelBindingContext bindingContext)
        {
            //var result = bindingContext.ValueProvider.GetValue(bindingContext.ModelName);
            //return new ObjectId(result.AttemptedValue);
            var key = bindingContext.ModelName;
            var val = bindingContext.ValueProvider.GetValue(key);
            if (val != null)
            {
                var attempt = val.AttemptedValue;

                ObjectId id;
                if (ObjectId.TryParse(attempt, out id))
                {
                    bindingContext.Model = id;
                    return true;
                }
            }
            return false;
        }
    }
}