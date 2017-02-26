using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace AppyWebServices.Model
{


    [DataContract]
    public class UserQuery
    {
        [DataMember(Name = "cid")]
        public Int32 cid { get; set; }

        [DataMember(Name = "querytype")]
        public string querytype { get; set; }

        [DataMember(Name = "description")]
        public string description { get; set; }

        //[DataMember(Name = "email")]
        //public string email { get; set; }

        //[DataMember(Name = "registeredemail")]
        //public string registeredemail { get; set; }

        //[DataMember(Name = "mobile")]
        //public string mobile { get; set; }

        //[DataMember(Name = "handsetnumber")]
        //public string handsetnumber { get; set; }

        //[DataMember(Name = "imei")]
        //public string imei { get; set; }

        //[DataMember(Name = "gcmid")]
        //public string gcmid { get; set; }


    }

    [DataContract]
    public class SendSMS
    {
        [DataMember]
        public string mobile { get; set; }

    }
    [DataContract]
    public class UserDataQueryN
    {
        [DataMember(Name = "cid")]
        public Int32 cid { get; set; }

        //[DataMember(Name = "qdate")]
        //public DateTime qdate { get; set; }

        [DataMember(Name = "qname")]
        public string qname { get; set; }

        [DataMember(Name = "qmobile")]
        public string qmobile { get; set; }

        [DataMember(Name = "qemail")]
        public string qemail { get; set; }

        [DataMember(Name = "qregisteredemail")]
        public string qregisteredemail { get; set; }

        [DataMember(Name = "qdescription")]
        public string qdescription { get; set; }

        [DataMember(Name = "remarks")]
        public string remarks { get; set; }

        //[DataMember(Name = "registeredemail")]
        //public string registeredemail { get; set; }

        //[DataMember(Name = "mobile")]
        //public string mobile { get; set; }

        //[DataMember(Name = "handsetnumber")]
        //public string handsetnumber { get; set; }

        //[DataMember(Name = "imei")]
        //public string imei { get; set; }

        //[DataMember(Name = "gcmid")]
        //public string gcmid { get; set; }


    }

    [DataContract]
    public class RegisterAppyGCMId
    {

        [DataMember(Name = "email")]
        public string email { get; set; }

        [DataMember(Name = "model")]
        public string model { get; set; }

        [DataMember(Name = "imei")]
        public string imei { get; set; }

        [DataMember(Name = "gcmid")]
        public string gcmid { get; set; }

        [DataMember(Name = "appid")]
        public Int32 appid { get; set; }


    }


    [DataContract]
    public class CategorywiseID
    {
        [DataMember(Name = "eauid")]
        public Int32 eauid { get; set; }

        [DataMember(Name = "idwid")]
        public Int32 idwid { get; set; }

        [DataMember(Name = "scateid")]
        public string scateid { get; set; }

    }
    [DataContract]
    public class UpdateGCMId
    {
        [DataMember(Name = "eauid")]
        public Int32 eauid { get; set; }

        [DataMember(Name = "gcmid")]
        public string gcmid { get; set; }


    }

    [DataContract]
    public class GetUserCatSubCat
    {
        [DataMember]
        public Int32 cateid { get; set; }

        [DataMember]
        public Int32 scateid { get; set; }

        [DataMember]
        public string category { get; set; }

        [DataMember]
        public string subcategory { get; set; }

        [DataMember]
        public string name { get; set; }

        [DataMember]
        public string email { get; set; }

        [DataMember]
        public string mobile { get; set; }

        public GetUserCatSubCat(string eml, string mble, string nm, Int32 cid, Int32 scid, string cat, string subcat)
        {
            cateid = cid;
            scateid = scid;
            category = cat;
            subcategory = subcat;
            email = eml;
            mobile = mble;
            name = nm;
        }
    }
    [DataContract]
    public class GetPublicPages
    {
        [DataMember]
        public string PageName { get; set; }

        [DataMember]
        public string PageContent { get; set; }

        [DataMember]
        public int PPId { get; set; }
        public GetPublicPages(string PageNm, string PgContent, int pID)
        {
            PageName = PageNm;
            PageContent = PgContent;
            PPId = pID;

        }
    }

    [DataContract]
    public class GetUser
    {
        [DataMember]
        public string remarks { get; set; }

        [DataMember]
        public string type { get; set; }

        [DataMember]
        public string city { get; set; }

        [DataMember]
        public string promocode { get; set; }

        [DataMember]
        public string country { get; set; }

        [DataMember]
        public string name { get; set; }

        [DataMember]
        public string email { get; set; }

        [DataMember]
        public string mobile { get; set; }
        [DataMember]
        public string Language { get; set; }

        [DataMember]
        public Int32 eauid { get; set; }

        public GetUser(string eml, string mble, string nm, string remrks, string typ, string cty, string promocd, string cuntry, Int32 eaud, string Lang)
        {
            remarks = remrks;
            type = typ;
            city = cty;
            promocode = promocd;
            country = cuntry;
            email = eml;
            mobile = mble;
            name = nm;
            eauid = eaud;
            Language=Lang;
        }
    }

    [DataContract]
    public class UpdateProfile
    {
        [DataMember]
        public string remarks { get; set; }

        [DataMember]
        public string type { get; set; }

        [DataMember]
        public string city { get; set; }

        [DataMember]
        public string promocode { get; set; }

        [DataMember]
        public string country { get; set; }

        [DataMember]
        public string name { get; set; }

        [DataMember]
        public string email { get; set; }

        [DataMember]
        public string mobile { get; set; }

        [DataMember]
        public string user { get; set; }

        [DataMember]
        public string pwd { get; set; }

        [DataMember]
        public string Language { get; set; }

        //public UpdateProfile(string eml, string mble, string nm, string remrks, string typ, string cty, string promocd, string cuntry)
        //{
        //    remarks = remrks;
        //    type = typ;
        //    city = cty;
        //    promocode = promocd;
        //    country = cuntry;
        //    email = eml;
        //    mobile = mble;
        //    name = nm;
        //}
    }
    [DataContract]
    public class UpdateEmail
    {
        [DataMember]
        public Int32 eauid { get; set; }

        [DataMember]
        public string currentemail { get; set; }

        [DataMember]
        public string newemail { get; set; }

    }
    [DataContract]
    public class UpdatePassword
    {
        [DataMember]
        public string user { get; set; }

        [DataMember]
        public string oldpwd { get; set; }

        [DataMember]
        public string newpwd { get; set; }

    }

    [DataContract]
    public class Languages
    {
        public Languages(int lanID, string lanuga)
        {
            LId = lanID;
            Language = lanuga;
        }
        [DataMember]
        public Int32 LId { get; set; }
        [DataMember]
        public string Language { get; set; }
    }



    [DataContract]
    public class UserMessage
    {
        [DataMember]
        public Int32 eid { get; set; }

        [DataMember]
        public string sub { get; set; }

        [DataMember]
        public string desc { get; set; }

        [DataMember]
        public Boolean enable { get; set; }

        [DataMember]
        public Int32 msgid { get; set; }
    }
    [DataContract]
    public class SendUserMessage
    {
        [DataMember]
        public Int32 mid { get; set; }

        [DataMember]
        public string mobile { get; set; }

        [DataMember]
        public string message { get; set; }

    }
    [DataContract]
    public class UpdateLanguage
    {
        [DataMember]
        public Int32 UserID { get; set; }

        [DataMember]
        public string lang { get; set; }

    }

    [DataContract]
    public class UpdateUserMessage
    {
        [DataMember]
        public Int32 msgid { get; set; }

        [DataMember]
        public Boolean enable { get; set; }

    }
    [DataContract]
    public class updateMessage
    {
        [DataMember]
        public int EAUId { get; set; }

        [DataMember]
        public int Messagescount { get; set; }

        public updateMessage(int uid, int messg)
        {
            EAUId = uid;
            Messagescount = messg;
        }

    }
    [DataContract]
    public class GetCatSubCat
    {
        [DataMember]
        public Int32 cateid { get; set; }

        [DataMember]
        public Int32 scateid { get; set; }

        [DataMember]
        public string category { get; set; }

        [DataMember]
        public string subcategory { get; set; }

        public GetCatSubCat(Int32 cid, Int32 scid, string cat, string subcat)
        {
            cateid = cid;
            scateid = scid;
            category = cat;
            subcategory = subcat;
        }
    }
    [DataContract]
    public class GetMessages
    {
        [DataMember]
        public Int32 mid { get; set; }

        [DataMember]
        public string smsdetails { get; set; }
        public GetMessages(Int32 id, string smsdtls)
        {
            mid = id;
            smsdetails = smsdtls;
        }
    }
    [DataContract]
    public class GetScreenMessage
    {
        [DataMember]
        public string screenname { get; set; }

        [DataMember]
        public string message { get; set; }
        public GetScreenMessage(string scrn, string msg)
        {
            screenname = scrn;
            message = msg;
        }
    }

    [DataContract]
    public class GetUserMessage
    {
        [DataMember]
        public Int32 msgid { get; set; }

        [DataMember]
        public Int32 eid { get; set; }

        [DataMember]
        public string sub { get; set; }

        [DataMember]
        public string desc { get; set; }

        [DataMember]
        public Boolean enable { get; set; }

        public GetUserMessage(Int32 msid, Int32 ed, string sb, string dsc, Boolean enble)
        {
            msgid = msid;
            eid = ed;
            sub = sb;
            desc = dsc;
            enable = enble;
        }
    }

    [DataContract]
    public class GetToolsTechs
    {
        [DataMember]
        public string title { get; set; }
        [DataMember]
        public string description { get; set; }

        public GetToolsTechs(string tit, string dsc)
        {

            title = tit;
            description = dsc;

        }
    }

    [DataContract]
    public class GetCustomer
    {
        [DataMember]
        public Int32 cid { get; set; }

        [DataMember]
        public Int32 jid { get; set; }

        [DataMember]
        public DateTime jdate { get; set; }

        [DataMember]
        public string jno { get; set; }

        [DataMember]
        public string jobstatus { get; set; }

        [DataMember]
        public string cname { get; set; }

        [DataMember]
        public string company { get; set; }

        [DataMember]
        public string address { get; set; }

        [DataMember]
        public string phone { get; set; }

        [DataMember]
        public string mobile1 { get; set; }

        [DataMember]
        public string mediatype { get; set; }

        [DataMember]
        public string email { get; set; }

        [DataMember]
        public string mediamodel { get; set; }

        [DataMember]
        public string serialno { get; set; }

        [DataMember]
        public string capacity { get; set; }

        [DataMember]
        public string capacityin { get; set; }

        [DataMember]
        public string partno { get; set; }

        [DataMember]
        public string pcbrev { get; set; }

        [DataMember]
        public string pcbstiker { get; set; }

        [DataMember]
        public string partfamily { get; set; }

        [DataMember]
        public string problemtype { get; set; }

        [DataMember]
        public string openpermitted { get; set; }

        [DataMember]
        public string detailproblem { get; set; }

        [DataMember]
        public string previoustry { get; set; }

        [DataMember]
        public string numberofpartition { get; set; }

        [DataMember]
        public string sizeofpartition { get; set; }

        [DataMember]
        public string operatingsystem { get; set; }

        [DataMember]
        public string remarks { get; set; }

        [DataMember]
        public string filesystem { get; set; }

        [DataMember]
        public string frompartition { get; set; }

        [DataMember]
        public string directoryinformation { get; set; }

        [DataMember]
        public string nameoffiles { get; set; }

        [DataMember]
        public string filetype { get; set; }

        [DataMember]
        public string estimate { get; set; }

        [DataMember]
        public string family { get; set; }

        [DataMember]
        public string estimatedtime { get; set; }

        [DataMember]
        public string fw { get; set; }

        [DataMember]
        public string recoverypercentage { get; set; }

        [DataMember]
        public string couriercompany { get; set; }

        [DataMember]
        public string courierdocitno { get; set; }

        [DataMember]
        public DateTime courierdate { get; set; }

        [DataMember]
        public string datalist { get; set; }

        [DataMember]
        public string datalistattachment { get; set; }

        [DataMember]
        public string diagnosedstatus { get; set; }

        //[DataMember]
        //public string username { get; set; }

        //[DataMember]
        //public string password { get; set; }


        public GetCustomer(Int32 cd, Int32 jd, DateTime jdt, string jn, string jobstat, string cnam, string comp, string add, string phon, string mobl1, string mediaty, string emal, string mediamodl, string seralno, string capacty, string capactyin, string partn, string pcbre, string pcbstikr, string partfamly, string problemtyp, string openpermited, string detailprobl, string prevstry, string noofpartition, string szeofpartition, string OS, string remrks, string filesystm, string frmpartition, string directoryinfo, string nameoffles, string filetyp, string estimat, string famly, string estimatedtim, string f, string recoverypercent, string couriercomp, string courierdoctno, DateTime courierdt, string datalst, string datalstattachment, string diagnosedstat)
        {
            cid = cd;
            jid = jd;
            jdate = jdt;
            jno = jn;
            jobstatus = jobstat;
            cname = cnam;
            company = comp;
            address = add;
            phone = phon;
            mobile1 = mobl1;
            mediatype = mediaty;
            email = emal;
            mediamodel = mediamodl;
            serialno = seralno;
            capacity = capacty;
            capacityin = capactyin;
            partno = partn;
            pcbrev = pcbre;
            pcbstiker = pcbstikr;
            partfamily = partfamly;
            problemtype = problemtyp;
            openpermitted = openpermited;
            detailproblem = detailprobl;
            previoustry = prevstry;
            numberofpartition = noofpartition;
            sizeofpartition = szeofpartition;
            operatingsystem = OS;
            remarks = remrks;
            filesystem = filesystm;
            frompartition = frmpartition;
            directoryinformation = directoryinfo;
            nameoffiles = nameoffles;
            filetype = filetyp;
            estimate = estimat;
            family = famly;
            estimatedtime = estimatedtim;
            fw = f;
            recoverypercentage = recoverypercent;
            couriercompany = couriercomp;
            courierdocitno = courierdoctno;
            courierdate = courierdt;
            datalist = datalst;
            datalistattachment = datalstattachment;
            diagnosedstatus = diagnosedstat;
            //username = usernm;
            //password = pwd;
        }
    }

    [DataContract]
    public class RegisterAppy
    {
        [DataMember]
        public string name { get; set; }
        [DataMember]
        public string email { get; set; }

        [DataMember]
        public string registeremail { get; set; }

        [DataMember]
        public string mobile { get; set; }

        [DataMember]
        public string remarks { get; set; }

        [DataMember]
        public string type { get; set; }

        [DataMember]
        public string city { get; set; }

        [DataMember]
        public string promocode { get; set; }

        [DataMember]
        public string clientid { get; set; }

        [DataMember]
        public string country { get; set; }

        [DataMember]
        public string user { get; set; }

        [DataMember]
        public string pwd { get; set; }
        [DataMember]
        public string Language { get; set; }

        [DataMember]
        public string DType { get; set; }

        [DataMember]
        public string CountryCode { get; set; }

        [DataMember]
        public int Messages { get; set; }

        [DataMember]
        public string GCMId { get; set; }


    }
}