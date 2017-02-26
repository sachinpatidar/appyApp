using AppyWebServices.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;

namespace AppyWebServices
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the interface name "ICustomerAP" in both code and config file together.
    [ServiceContract]
    public interface ICustomerAP
    {


        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "GetCustomer/{username}/{password}")]
        List<GetCustomer> GetCustomer(string username, string password);

        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "GetUser/{user}/{pwd}")]

        List<GetUser> GetUser(string user, string pwd);

        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "GetGFTUser/{email}")]
        List<GetUser> GetGFTUser(string email);


        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "GetUserCategorySubCategory/{user}/{pwd}/{LID}")]
        List<GetUserCatSubCat> GetUserCatSubCat(string user, string pwd, string LID);

        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "GetPublicPagesinfo/{id}/{LID}")]
        List<GetPublicPages> GetPublicPagesinfo(string id, string LID);

        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "GetCategorySubCategory/{LID}")]
        List<GetCatSubCat> GetCatSubCat(string LID);

        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "GetMessages/{LID}")]
        List<GetMessages> GetMessages(string LID);

        [OperationContract]

        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, UriTemplate = "UserQuery")]
        string UserQuery(UserQuery uqry);

        [OperationContract]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, UriTemplate = "SendUserMessage")]
        string SendUserMessage(SendUserMessage sumsg);

        [OperationContract]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, UriTemplate = "UserDataQuery")]
        string UserDataQueryN(UserDataQueryN usrdqry);

        [OperationContract]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, UriTemplate = "RegisterAppyGCMId")]
        string RegisterAppyUserGCMId(RegisterAppyGCMId register);

        [OperationContract]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, UriTemplate = "CategorywiseID")]
        string CategorywiseID(CategorywiseID cwid);

        [OperationContract]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, UriTemplate = "UpdateGCMId")]
        string UpdateGCMId(UpdateGCMId updtgcm);

        [OperationContract]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, UriTemplate = "RegisterAppy")]
        string RegisterAppyUser(RegisterAppy register);

        [OperationContract]
        //attribute for returning JSON format
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "ForgotPassword/{type}/{value}")]
        string ForgotPassword(string type, string value);

        [OperationContract]

        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "SendOTP/{mobile}")]
        string SendOTP(string mobile);

       

        [OperationContract]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, UriTemplate = "UpdateProfile")]

        string UpdateProfile(UpdateProfile updprfl);

        [OperationContract]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, UriTemplate = "UpdateEmail")]
        string UpdateEmail(UpdateEmail updeml);

        [OperationContract]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, UriTemplate = "SendOTP_sms")]
        string SendOTP_sms(SendSMS obj);


        [OperationContract]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, UriTemplate = "UpdatePassword")]
        string UpdatePassword(UpdatePassword updpwd);

        [OperationContract]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, UriTemplate = "UserMessage")]

        string UserMessage(UserMessage usrmsg);

        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "GetUserMessage/{eid}")]
        List<GetUserMessage> GetUserMessage(string eid);

        [OperationContract]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, UriTemplate = "UpdateMessage")]
        string UpdateMessage(updateMessage obj);

        [OperationContract]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, UriTemplate = "UpdateLanguage")]
        string UpdateLanguage(UpdateLanguage obj);

        [OperationContract]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, UriTemplate = "UpdateUserMessage")]
        string UpdateUserMessage(UpdateUserMessage updusrmsg);

        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "GetToolsTechs/{LID}")]
        List<GetToolsTechs> GetToolsTechs(string LID);

        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "GetScreenMessage")]
        List<GetScreenMessage> GetScreenMessage();

        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "GetMaxMessageLimit/{userID}")]
        List<updateMessage> GetMaxMessageLimit(string userID);

        [OperationContract]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, UriTemplate = "DeletePrivateMessage")]
        string DeletePrivateMessage(UserMessage usrmsg);

        [OperationContract]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, UriTemplate = "UpdatePrivateMessage")]
        string UpdatePrivateMessage(UserMessage usrmsg);

        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "GetLanguages")]
        List<Languages> GetLanguages();


    }
}
