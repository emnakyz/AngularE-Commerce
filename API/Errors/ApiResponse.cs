using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Errors
{
    public class ApiResponse
    {
        public ApiResponse(int statuscode,string message =null)
        {
            this.StatusCode = statuscode;
            this.Message = message ?? GetDefaultMessageForStatusCode(statuscode);
        }

        private string GetDefaultMessageForStatusCode(int statuscode)
        {
            string errorMessage = string.Empty;
            switch (statuscode)
            {
                case 400:
                    errorMessage = "A bad request!";
                    break;
                case 401:
                    errorMessage = "Authorized error";
                    break;
                case 404:
                    errorMessage = "Resource not found";
                    break;
                case 500:
                    errorMessage = "Server error";
                    break;
            }
            return errorMessage;
        }

        public int StatusCode { get; set; }
        public string Message { get; set; }
    }
}
