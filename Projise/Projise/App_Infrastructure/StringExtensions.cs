using System;
namespace Projise.App_Infrastructure
{
    public static class StringExtensions
    {
        public static string ToCamelCase(this string value)
        {
            if (string.IsNullOrEmpty(value))
            {
                return value;
            }
            var firstChar = value[0];
            if (char.IsLower(firstChar))
            {
                return value;
            }
            firstChar = char.ToLowerInvariant(firstChar);
            return firstChar + value.Substring(1);
        }

        public static DateTime? ToDate(this string date)
        {
            DateTime? result = null;
            DateTime parsed;
            if (DateTime.TryParse(date, out parsed))
            {
                result = parsed;
            }
            return result;
        }
    }
}