using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http.Controllers;
using System.Web.Http.ModelBinding;

namespace Projise.App_Infrastructure
{
    public class ObjectIdBinder : IModelBinder
    {
        public bool BindModel(HttpActionContext actionContext, ModelBindingContext bindingContext)
        {
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