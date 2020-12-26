using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using ExcelDataReader;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json.Serialization;

namespace Engrisk.Helper
{
    public static class Extension
    {
        public static void AddPaginationHeader(this HttpResponse response, int currentPage, int pageSize, int totalItems, int totalPages)
        {
            var paginationHeader = new PaginationHeader(currentPage, pageSize, totalItems, totalPages);
            var camelPropertyName = new JsonSerializerSettings();
            camelPropertyName.ContractResolver = new CamelCasePropertyNamesContractResolver();
            response.Headers.Append("Pagination", JsonConvert.SerializeObject(paginationHeader, camelPropertyName));
            response.Headers.Append("Access-Control-Expose-Headers", "Pagination");
        }
        public static bool CompareDate(this DateTime date, DateTime inputDate)
        {
            if (date.Year != inputDate.Year || date.Month != inputDate.Month || date.Day != inputDate.Day)
            {
                return false;
            }
            return true;
        }
        public static bool CompareProperties<T>(this T subject, Dictionary<dynamic, dynamic> properties) where T : class
        {
            int samePropertiesCount = 0;
            foreach (var property in subject.GetType().GetProperties())
            {
                if (properties.CompareKey(property.Name))
                {
                    if (property.GetValue(subject).Equals(properties[property.Name]))
                    {
                        samePropertiesCount++;
                    }
                }
            }
            if (samePropertiesCount == properties.Count)
            {
                return true;
            }
            return false;
        }
        public static bool CompareKey(this Dictionary<dynamic, dynamic> properties, dynamic key)
        {
            foreach (var propKey in properties.Keys)
            {
                if (propKey.Equals(key))
                {
                    return true;
                }
            }
            return false;
        }
        public static bool ExistsValue<T>(this T subject, dynamic value) where T : class
        {
            foreach (var property in subject.GetType().GetProperties())
            {
                if (property.GetValue(subject).Equals(value))
                {
                    return true;
                }
            }
            return false;
        }
        public static int CalculateAge(this DateTime dob)
        {
            var age = DateTime.Now.Year - dob.Year;
            if (dob.AddYears(age) > DateTime.Now)
            {
                age--;
            }
            return age;
        }
        public static double ConvertToTimestamp(this DateTime date)
        {
            DateTime epoch = DateTime.UnixEpoch;
            TimeSpan result = date.Subtract(epoch);

            double seconds = result.TotalMilliseconds;
            return seconds;
        }
        public static double MinusDate(this DateTime endDate, DateTime startDate)
        {
            var timestamp = (endDate.Subtract(startDate)).TotalSeconds;
            return timestamp;
        }
        public static async Task<IEnumerable<JToken>> DeserializeJson(this IFormFile file)
        {
            try
            {
                using (var fileStream = file.OpenReadStream())
                {
                    using (var result = new StreamReader(fileStream))
                    {
                        using (var json = new JsonTextReader(result))
                        {
                            var jResult = await JToken.ReadFromAsync(json);
                            return jResult.Children().ToList();
                        }
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }

        }
        ///<summary>
        ///<para>Đọc file từ excel chỉ nhận các file *.csv hoặc *.xlsx</para>
        ///</summary>
        public static async Task<DataSet> ReadExcel(this IFormFile file)
        {
            using (var stream = file.OpenReadStream())
            {
                using (var reader = ExcelReaderFactory.CreateReader(stream))
                {
                    var result = reader.AsDataSet(new ExcelDataSetConfiguration()
                    {
                        UseColumnDataType = true,
                        ConfigureDataTable = (_) => new ExcelDataTableConfiguration()
                        {
                            UseHeaderRow = true
                        }
                    });
                    return result;
                }
            }
        }
        ///<summary>
        ///<p>Thay đổi một property của một list được phân trang thành null sử dụng reflection</p>
        ///</summary>
        public static PagingList<T> SetNullProperty<T>(this PagingList<T> source, string property)
        {
            foreach (var item in source)
            {
                PropertyInfo prop = item.GetType().GetProperty(property);
                if (prop != null)
                {
                    prop.SetValue(item, null);
                }
            }
            return source;
        }
        public static T GetOneRandomFromList<T>(this IEnumerable<T> source){
            var random = new Random();
            var index = random.Next(0, source.Count());
            return source.ElementAt(index);
        }
    }
}