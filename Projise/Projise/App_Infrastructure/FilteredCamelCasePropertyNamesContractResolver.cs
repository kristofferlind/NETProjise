using System;
using System.Collections.Generic;
using System.Reflection;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace Projise.App_Infrastructure
{
    public class FilteredCamelCasePropertyNamesContractResolver : DefaultContractResolver
    {
        public FilteredCamelCasePropertyNamesContractResolver()
        {
            AssembliesToInclude = new HashSet<Assembly>();
            TypesToInclude = new HashSet<Type>();
        }
        public HashSet<Assembly> AssembliesToInclude { get; set; } // Identifies assemblies to include from camel-casing
        public HashSet<Type> TypesToInclude { get; set; } // Identifies types to include from camel-casing

        protected override JsonProperty CreateProperty(MemberInfo member, MemberSerialization memberSerialization)
        {
            var jsonProperty = base.CreateProperty(member, memberSerialization);

            Type declaringType = member.DeclaringType;
            if (
                TypesToInclude.Contains(declaringType)
                || AssembliesToInclude.Contains(declaringType.Assembly))
            {
                jsonProperty.PropertyName = jsonProperty.PropertyName.ToCamelCase();
            }
            return jsonProperty;
        }
    }
}