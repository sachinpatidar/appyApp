using AppyWebServices.Model;
using System;
using System.Collections.Generic;

using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Web;
using System.Configuration;
using System.Web.Mail;
using System.Net;
using Plivo.API;
using RestSharp;
namespace AppyWebServices
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "CustomerAP" in code, svc and config file together.
    // NOTE: In order to launch WCF Test Client for testing this service, please select CustomerAP.svc or CustomerAP.svc.cs at the Solution Explorer and start debugging.
    public class CustomerAP : ICustomerAP
    {
        Int32 rows = 0;
        SqlConnection conRegisterCustomer;
        SqlCommand cmdRegisterCustomer;

        public string RegisterAppyUser(RegisterAppy register)
        {
            try
            {
                conRegisterCustomer = new SqlConnection(ConfigurationManager.AppSettings["Rounak"]);
                cmdRegisterCustomer = new SqlCommand("Appy_API_Insert_User", conRegisterCustomer);
                conRegisterCustomer.Open();

                cmdRegisterCustomer.CommandType = CommandType.StoredProcedure;

                cmdRegisterCustomer.Parameters.AddWithValue("@Name", register.name);
                cmdRegisterCustomer.Parameters.AddWithValue("@Email", register.email);
                cmdRegisterCustomer.Parameters.AddWithValue("@RegisterEmail", register.registeremail);
                cmdRegisterCustomer.Parameters.AddWithValue("@Mobile", register.mobile);
                cmdRegisterCustomer.Parameters.AddWithValue("@Remarks", register.remarks);
                cmdRegisterCustomer.Parameters.AddWithValue("@Type", register.type);
                cmdRegisterCustomer.Parameters.AddWithValue("@City", register.city);
                cmdRegisterCustomer.Parameters.AddWithValue("@Country", register.country);
                //cmdRegisterCustomer.Parameters.AddWithValue("@ClientId", register.clientid);
                cmdRegisterCustomer.Parameters.AddWithValue("@GCMId", register.GCMId);
                cmdRegisterCustomer.Parameters.AddWithValue("@User", register.user);
                cmdRegisterCustomer.Parameters.AddWithValue("@Pwd", register.pwd);
                cmdRegisterCustomer.Parameters.AddWithValue("@PromoCode", register.promocode);
                cmdRegisterCustomer.Parameters.AddWithValue("@Language", register.Language);
                cmdRegisterCustomer.Parameters.AddWithValue("@DType", register.DType);
                cmdRegisterCustomer.Parameters.AddWithValue("@CountryCode", register.CountryCode);
                cmdRegisterCustomer.Parameters.AddWithValue("@Messages", register.Messages.ToString());

                cmdRegisterCustomer.Parameters.AddWithValue("@CreateDate", System.DateTime.Now.ToString("MM/dd/yyyy hh:mm:ss tt"));


                SqlParameter parmOUT = new SqlParameter("@EAUId", SqlDbType.Int);
                parmOUT.Direction = ParameterDirection.Output;
                cmdRegisterCustomer.Parameters.Add(parmOUT);

                SqlParameter parmOUT2 = new SqlParameter("@Status", SqlDbType.NVarChar);
                parmOUT2.Size = 50;
                parmOUT2.Direction = ParameterDirection.Output;
                cmdRegisterCustomer.Parameters.Add(parmOUT2);

                cmdRegisterCustomer.ExecuteNonQuery();
                rows = (int)cmdRegisterCustomer.Parameters["@EAUId"].Value;
                string status = Convert.ToString(cmdRegisterCustomer.Parameters["@Status"].Value);

                if (rows == 0)
                {
                    return "fail";
                }
                else if (rows == -2)
                {
                    return "User already exists";
                }
                else if (rows == -3)
                {
                    return "Email already exists";
                }
                else if (rows == -6)
                {
                    return "Mobile number already exists";
                }

                else
                {
                    if (status == "registered")
                    {

                    }
                    else
                    {
                        //Random rndm = new Random();
                        //Int32 OTP = rndm.Next(100000, 999999);
                        //SendSMS(register.mobile, Convert.ToString(OTP));

                        MailMessage mailMessage = new MailMessage();
                        //creating an instance of the MailMessage class 
                        mailMessage.From = "Appy<Appy@visioninfotechonline.com>";// "noreply@redsteth.com";
                        //senders email address 
                        mailMessage.To = "pawan.j@cisinlabs.com";//qwi.email; //txtEmail.Text.Trim();info@waytoappy.com
                        //recipient's email address 
                        //mailMessage.Cc = txtEmail.Text.Trim();
                        //email address of the Cc recipient 
                        //mailMessage.Bcc = "redsteth2010@gmail.com";//pwd : rsteth#3579
                        //email address of the Bcc recipient 
                        mailMessage.Subject = "New registration from  " + register.name;//objSubscription.pSubject;// "Subscription Request Received";// + Session["NewGenId"].ToString();
                        //subject of the email message 
                        mailMessage.BodyFormat = MailFormat.Html;
                        //message text format. Can be text or html 
                        mailMessage.Body = "Name : " + register.name + "<br />Mobile : " + register.mobile + "<br />Email : " + register.email + "<br />Date : " + DateTime.Now.ToString("MM/dd/yyyy hh:mm:ss tt") + "<br />city : " + register.city + "<br />country : " + register.country + "<br />Login Type : " + register.type + "<br />promocode : " + register.promocode + "<br />Remarks : " + register.remarks;// +Footer;//"<HTML><HEAD><TITLE></TITLE></HEAD><BODY><h5>Dear " + objSubscription.pName + "<br>Sender Id: " + /*Session["jName"].ToString() +*/"<br>CustomerId: " +/*Session["jName"].ToString() +*/ "<br>Mobile: " + /*Session["jName"].ToString() +*/ "<br>Email Id: " +/*Session["jName"].ToString() +*/ "<br>Subscription Date: " + /*Session["jName"].ToString() +*/ "<br>UserName: " + /*Session["jName"].ToString() +*/"<br>Password: " +/*Session["jName"].ToString() +*/ "</h5></BODY></HTML>";

                        //message body 
                        mailMessage.Priority = MailPriority.High;
                        //email priority. Can be low, normal or high 


                        mailMessage.Fields.Add("http://schemas.microsoft.com/cdo/configuration/smtpauthenticate", "1"); //basic authentication
                        mailMessage.Fields.Add("http://schemas.microsoft.com/cdo/configuration/sendusername", "Appy@visioninfotechonline.com"); //set your username here
                        mailMessage.Fields.Add("http://schemas.microsoft.com/cdo/configuration/sendpassword", "Xivb615&");  //set your password here //medicoz#3579

                        SmtpMail.SmtpServer = "mail.visioninfotechonline.com";//"74.63.254.213";// "mail.dawaiwale.com";// "174.36.220.176";// "69.65.43.156";//"70.87.29.14";// "mail.medicozlemon.com";//"smtp.medicozlemon.com";// "mail.redsteth.com";// "69.65.43.156";
                        //mail server used to send this email. modify this line based on your mail server 

                        //using the static method "Send" of the SmtpMail class to send the mail 

                        //Settings to configure Outlook, Thunderbird or any email client

                        //POP Server: pop.medicozlemon.com

                        //IMAP Server: imap.medicozlemon.com

                        //SMTP Server: smtp.medicozlemon.com

                        try
                        {
                            SmtpMail.Send(mailMessage);
                            //SendSMS("9425055817", "new query:Name " + usrdqry.qname + ";Mobile " + usrdqry.qmobile + ";Email " + usrdqry.qemail + ";Date " + DateTime.Now.ToString("MM/dd/yyyy hh:mm:ss tt") + ";Description " + usrdqry.qdescription + ";Remarks " + usrdqry.remarks);

                            //Response.Write("Mail sent");
                            //Valid = true;
                        }

                        catch
                        {
                            //Valid = false;
                            //throw;

                        }

                    }
                    return "You are successfully registered";
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

            finally
            {
                conRegisterCustomer.Close();
                conRegisterCustomer.Dispose();


            }
        }

        public string CategorywiseID(CategorywiseID cwid)
        {
            try
            {

                conRegisterCustomer = new SqlConnection(ConfigurationManager.AppSettings["Rounak"]);
                cmdRegisterCustomer = new SqlCommand("Appy_API_Insert_CategorywiseID", conRegisterCustomer);
                conRegisterCustomer.Open();
                // conRegisterCustomer.BeginTransaction("Customer");

                cmdRegisterCustomer.CommandType = CommandType.StoredProcedure;
                cmdRegisterCustomer.Parameters.AddWithValue("@EAUID", cwid.eauid);
                cmdRegisterCustomer.Parameters.AddWithValue("@SCATEID", cwid.scateid);
                SqlParameter parmOUT = new SqlParameter("@Id", SqlDbType.Int);
                parmOUT.Direction = ParameterDirection.Output;
                cmdRegisterCustomer.Parameters.Add(parmOUT);
                cmdRegisterCustomer.ExecuteNonQuery();
                rows = (int)cmdRegisterCustomer.Parameters["@Id"].Value;
                if (rows == 0)
                {
                    return "fail";
                }

                else if (rows == -2)
                {
                    return "success";
                }
                else
                {
                    return "success";
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

            finally
            {
                conRegisterCustomer.Close();
                conRegisterCustomer.Dispose();


            }
        }
        public string UpdateLanguage(UpdateLanguage obj)
        {
            try
            {

                conRegisterCustomer = new SqlConnection(ConfigurationManager.AppSettings["Rounak"]);
                cmdRegisterCustomer = new SqlCommand("Appy_API_Update_Language", conRegisterCustomer);
                conRegisterCustomer.Open();
                // conRegisterCustomer.BeginTransaction("Customer");

                cmdRegisterCustomer.CommandType = CommandType.StoredProcedure;
                cmdRegisterCustomer.Parameters.AddWithValue("@EAUId", obj.UserID);
                cmdRegisterCustomer.Parameters.AddWithValue("@NewLanguage", obj.lang);
                SqlParameter parmOUT = new SqlParameter("@ID", SqlDbType.Int);
                parmOUT.Direction = ParameterDirection.Output;
                cmdRegisterCustomer.Parameters.Add(parmOUT);
                cmdRegisterCustomer.ExecuteNonQuery();
                rows = (int)cmdRegisterCustomer.Parameters["@ID"].Value;

                if (rows == 0)
                {
                    return "fail";
                }

                else if (rows == -2)
                {
                    return "success";
                }
                else
                {
                    return "success";
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

            finally
            {
                conRegisterCustomer.Close();
                conRegisterCustomer.Dispose();
            }
        }

        public string UpdateMessage(updateMessage obj)
        {
            try
            {

                conRegisterCustomer = new SqlConnection(ConfigurationManager.AppSettings["Rounak"]);
                cmdRegisterCustomer = new SqlCommand("Appy_API_Update_MessageCount", conRegisterCustomer);
                conRegisterCustomer.Open();
                // conRegisterCustomer.BeginTransaction("Customer");

                cmdRegisterCustomer.CommandType = CommandType.StoredProcedure;
                cmdRegisterCustomer.Parameters.AddWithValue("@EAUId", obj.EAUId);
                cmdRegisterCustomer.Parameters.AddWithValue("@Messages", obj.Messagescount);
                SqlParameter parmOUT = new SqlParameter("@Id", SqlDbType.Int);
                parmOUT.Direction = ParameterDirection.Output;
                cmdRegisterCustomer.Parameters.Add(parmOUT);
                cmdRegisterCustomer.ExecuteNonQuery();
                rows = (int)cmdRegisterCustomer.Parameters["@Id"].Value;

                if (rows == 0)
                {
                    return "fail";
                }

                else if (rows == -2)
                {
                    return "success";
                }
                else
                {
                    return "success";
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

            finally
            {
                conRegisterCustomer.Close();
                conRegisterCustomer.Dispose();
            }
        }
        public List<updateMessage> GetMaxMessageLimit(string userID)
        {
            SqlConnection conn = new SqlConnection(ConfigurationManager.AppSettings["Rounak"]);
            try
            {
                List<updateMessage> GetupdateMessagelist = new List<updateMessage>();

                using (conn)
                {
                    conn.Open();
                    string cmdStr = String.Format("select Eauid, messages from [dbo].[EasyAccRegData] where Eauid=" + userID);
                    SqlCommand cmd = new SqlCommand(cmdStr, conn);
                    SqlDataReader rd = cmd.ExecuteReader();

                    if (rd.HasRows)
                    {
                        while (rd.Read())
                            GetupdateMessagelist.Add(new updateMessage(rd.GetInt32(0), rd.GetInt32(1)));
                    }

                }

                return GetupdateMessagelist;
            }

            catch (Exception ex)
            {
                throw ex;
            }

            finally
            {
                conn.Close();
                conn.Dispose();
            }
        }

        public string UpdateGCMId(UpdateGCMId updtgcm)
        {
            try
            {

                conRegisterCustomer = new SqlConnection(ConfigurationManager.AppSettings["Rounak"]);
                cmdRegisterCustomer = new SqlCommand("Appy_API_Update_GCMID", conRegisterCustomer);
                conRegisterCustomer.Open();
                cmdRegisterCustomer.CommandType = CommandType.StoredProcedure;
                cmdRegisterCustomer.Parameters.AddWithValue("@EAUID", updtgcm.eauid);
                cmdRegisterCustomer.Parameters.AddWithValue("@GCMID", updtgcm.gcmid);
                SqlParameter parmOUT = new SqlParameter("@Id", SqlDbType.Int);
                parmOUT.Direction = ParameterDirection.Output;
                cmdRegisterCustomer.Parameters.Add(parmOUT);
                cmdRegisterCustomer.ExecuteNonQuery();
                rows = (int)cmdRegisterCustomer.Parameters["@Id"].Value;
                if (rows == 0)
                {
                    return "fail";
                }

                else if (rows == -2)
                {
                    return "success";
                }
                else
                {
                    return "success";
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

            finally
            {
                conRegisterCustomer.Close();
                conRegisterCustomer.Dispose();


            }
        }
        public List<GetCatSubCat> GetCatSubCat(string LID)
        {
            SqlConnection conn = new SqlConnection(ConfigurationManager.AppSettings["Rounak"]);
            try
            {
                List<GetCatSubCat> GetCatSubCatlist = new List<GetCatSubCat>();

                using (conn)
                {
                    conn.Open();
                    string cmdStr = String.Format("Select c.CateID, sc.SCateid, ISNULL(c.Category,'') as Category, ISNULL(sc.Category,'') as subcategory from Categorymaster c inner join SubCategorymaster sc On c.CateID=sc.CateID where c.Showonoff='Y' and sc.Showonoff='Y' and sc.LId='" + LID + "'  order by c.Category");
                    SqlCommand cmd = new SqlCommand(cmdStr, conn);
                    SqlDataReader rd = cmd.ExecuteReader();

                    if (rd.HasRows)
                    {
                        while (rd.Read())
                            GetCatSubCatlist.Add(new GetCatSubCat(rd.GetInt32(0), rd.GetInt32(1), rd.GetString(2), rd.GetString(3)));
                    }

                }

                return GetCatSubCatlist;
            }

            catch (Exception ex)
            {
                throw ex;
            }

            finally
            {
                conn.Close();
                conn.Dispose();
            }
        }

        public List<GetMessages> GetMessages(string LID)
        {
            SqlConnection conn = new SqlConnection(ConfigurationManager.AppSettings["Rounak"]);
            try
            {
                List<GetMessages> GetMessageslist = new List<GetMessages>();
                using (conn)
                {
                    conn.Open();

                    string cmdStr = String.Format("Select ISNULL(MId,0) as MId,ISNULL(SMSDetails,'') as SMSDetails  from SMSMaster where Showonoff='Y' and LId='" + LID + "'  order by MID desc");
                    SqlCommand cmd = new SqlCommand(cmdStr, conn);
                    SqlDataReader rd = cmd.ExecuteReader();

                    if (rd.HasRows)
                    {
                        //return "success";
                        while (rd.Read())
                            GetMessageslist.Add(new GetMessages(rd.GetInt32(0), rd.GetString(1)));
                    }
                    //else
                    //{
                    //    return "fail";
                    //}
                    //conn.Close();
                }

                return GetMessageslist;
            }

            catch (Exception ex)
            {
                throw ex;
            }

            finally
            {
                conn.Close();
                conn.Dispose();


            }
        }
        public List<GetUserCatSubCat> GetUserCatSubCat(string user, string pwd, string LID)
        {
            SqlConnection conn = new SqlConnection(ConfigurationManager.AppSettings["Rounak"]);
            try
            {
                List<GetUserCatSubCat> GetUserCatSubCatlist = new List<GetUserCatSubCat>();
                using (conn)
                {
                    conn.Open();
                    string cmdStr = String.Format("Select ISNULL(ea.Email,'') as Email, ISNULL(ea.Mobile,'') as Mobile, ISNULL(ea.Name,'') as Name, ISNULL(c.CateID,0) as CateID, ISNULL(sc.SCateid,0) as SCateid,ISNULL(c.Category,'') as Category, ISNULL(sc.Category,'') as subcategory from Categorymaster c inner join SubCategorymaster sc On c.CateID=sc.CateID inner join IDwisecategory iw on iw.scateid=sc.SCateid inner join EasyAccRegData ea on iw.eauid=ea.EAUId WHERE c.Showonoff='Y' and sc.Showonoff='Y' AND ea.[User]='" + user + "' AND ea.pwd='" + pwd + "' and sc.LId='" + LID + "'  order by c.Category");
                    SqlCommand cmd = new SqlCommand(cmdStr, conn);
                    SqlDataReader rd = cmd.ExecuteReader();
                    if (rd.HasRows)
                    {
                        //return "success";
                        while (rd.Read())
                            GetUserCatSubCatlist.Add(new GetUserCatSubCat(rd.GetString(0), rd.GetString(1), rd.GetString(2), rd.GetInt32(3), rd.GetInt32(4), rd.GetString(5), rd.GetString(6)));
                    }
                }
                return GetUserCatSubCatlist;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                conn.Close();
                conn.Dispose();
            }
        }

        public List<GetUser> GetUser(string user, string pwd)
        {
            SqlConnection conn = new SqlConnection(ConfigurationManager.AppSettings["Rounak"]);
            try
            {
                List<GetUser> GetUserlist = new List<GetUser>();
                using (conn)
                {
                    conn.Open();
                    //string cmdStr = String.Format("Select ISNULL(Contact.CId,0) as CId,ISNULL(ASSESSMENTFORM.JId,0) as JId,ISNULL(JDate,'') as JDate,ISNULL(JNO,'') as JNO,ISNULL(JStatus,'') as JobStatus,ISNULL(CName,'') as CName,ISNULL(Company,'') as Company,ISNULL(Address,'') as Address,ISNULL(Phone,'') as Phone,ISNULL(Mobile1,'') as Mobile1,ISNULL(email,'') as email,ISNULL(ASSESSMENTFORM.MediaType,'') as MediaType,ISNULL(ASSESSMENTFORM.MediaModel,'') as MediaModel,ISNULL(SerialNo,'') as SerialNo,ISNULL(Capacity,'') as Capacity,ISNULL(ASSESSMENTFORM.CapacityIn,'') as CapacityIn,ISNULL(PartNo,'') as PartNo,ISNULL(PCBRev,'') as PCBRev,ISNULL(ASSESSMENTFORM.PCBStiker,'') as PCBStiker,ISNULL(PartFamily,'') as PartFamily,ISNULL(ProblemType,'') as ProblemType,ISNULL(OpenPermitted,'') as OpenPermitted,ISNULL(DetailProblem,'') as DetailProblem,ISNULL(PreviousTry,'') as PreviousTry,ISNULL(NumberOfPartition,'') as NumberOfPartition,ISNULL(SizeofPartition,'') as SizeofPartition,ISNULL(OperatingSystem,'') as OperatingSystem,ISNULL(remarks,'') as remarks,ISNULL(FileSystem,'') as FileSystem,ISNULL(FromPartition,'') as FromPartition,ISNULL(DirectoryInformation,'') as DirectoryInformation,ISNULL(NameOfFiles,'') as NameOfFiles,ISNULL(FileType,'') as FileType,ISNULL(Estimate,'') as Estimate,ISNULL(family,'') as family,ISNULL(EstimatedTime,'') as EstimatedTime,ISNULL(FW,'') as FW,ISNULL(RecoveryPercentage,'') as RecoveryPercentage,ISNULL(CourierCompany,'') as CourierCompany,ISNULL(CourierDocitNO,'') as CourierDocitNO,ISNULL(ASSESSMENTFORM.CourierDate,'') as CourierDate,ISNULL(DataList,'') as DataList,ISNULL(DataListAttachment,'') as DataListAttachment  from ASSESSMENTFORM    right outer Join  Contact ON ASSESSMENTFORM.CID=Contact.CID  Where Contact.username='" + username + "' AND contact.pwd='" + password + "'");
                    string cmdStr = String.Format("Select ISNULL(ea.Email,'') as Email, ISNULL(ea.Mobile,'') as Mobile, ISNULL(ea.Name,'') as Name, ISNULL(ea.Remarks,'') as Remarks, ISNULL(ea.Type,'') as Type, ISNULL(ea.City,'') as City, ISNULL(ea.PromoCode,'') as PromoCode, ISNULL(ea.Country,'') as Country,ISNULL(ea.eauid,0) as eauid,ea.Language   from EasyAccRegData ea WHERE ea.[User]='" + user + "' AND ea.pwd='" + pwd + "'");
                    SqlCommand cmd = new SqlCommand(cmdStr, conn);
                    SqlDataReader rd = cmd.ExecuteReader();

                    if (rd.HasRows)
                    {
                        //return "success";
                        while (rd.Read())
                            GetUserlist.Add(new GetUser(rd.GetString(0), rd.GetString(1), rd.GetString(2), rd.GetString(3), rd.GetString(4), rd.GetString(5), rd.GetString(6), rd.GetString(7), rd.GetInt32(8), rd.GetString(9)));
                    }

                }

                return GetUserlist;
            }

            catch (Exception ex)
            {
                throw ex;
            }

            finally
            {
                conn.Close();
                conn.Dispose();


            }
        }
        public List<GetPublicPages> GetPublicPagesinfo(string id, string LID)
        {
            SqlConnection conn = new SqlConnection(ConfigurationManager.AppSettings["Rounak"]);
            try
            {
                List<GetPublicPages> GetPublicPage = new List<GetPublicPages>();

                using (conn)
                {
                    conn.Open();
                    string cmdStr = String.Format("Select PageName,PageContent,PPId from PublicPages where  LId='" + LID + "'  and  PageName ='" + id + "'");
                    SqlCommand cmd = new SqlCommand(cmdStr, conn);
                    SqlDataReader rd = cmd.ExecuteReader();

                    if (rd.HasRows)
                    {
                        //return "success";
                        while (rd.Read())
                            GetPublicPage.Add(new GetPublicPages(rd.GetString(0), rd.GetString(1), rd.GetInt32(2)));
                    }
                }

                return GetPublicPage;
            }

            catch (Exception ex)
            {
                throw ex;
            }

            finally
            {
                conn.Close();
                conn.Dispose();


            }
        }

        public List<GetUser> GetGFTUser(string email)
        {
            SqlConnection conn = new SqlConnection(ConfigurationManager.AppSettings["Rounak"]);
            try
            {
                List<GetUser> GetUserlist = new List<GetUser>();
                using (conn)
                {
                    conn.Open();
                    //string cmdStr = String.Format("Select ISNULL(Contact.CId,0) as CId,ISNULL(ASSESSMENTFORM.JId,0) as JId,ISNULL(JDate,'') as JDate,ISNULL(JNO,'') as JNO,ISNULL(JStatus,'') as JobStatus,ISNULL(CName,'') as CName,ISNULL(Company,'') as Company,ISNULL(Address,'') as Address,ISNULL(Phone,'') as Phone,ISNULL(Mobile1,'') as Mobile1,ISNULL(email,'') as email,ISNULL(ASSESSMENTFORM.MediaType,'') as MediaType,ISNULL(ASSESSMENTFORM.MediaModel,'') as MediaModel,ISNULL(SerialNo,'') as SerialNo,ISNULL(Capacity,'') as Capacity,ISNULL(ASSESSMENTFORM.CapacityIn,'') as CapacityIn,ISNULL(PartNo,'') as PartNo,ISNULL(PCBRev,'') as PCBRev,ISNULL(ASSESSMENTFORM.PCBStiker,'') as PCBStiker,ISNULL(PartFamily,'') as PartFamily,ISNULL(ProblemType,'') as ProblemType,ISNULL(OpenPermitted,'') as OpenPermitted,ISNULL(DetailProblem,'') as DetailProblem,ISNULL(PreviousTry,'') as PreviousTry,ISNULL(NumberOfPartition,'') as NumberOfPartition,ISNULL(SizeofPartition,'') as SizeofPartition,ISNULL(OperatingSystem,'') as OperatingSystem,ISNULL(remarks,'') as remarks,ISNULL(FileSystem,'') as FileSystem,ISNULL(FromPartition,'') as FromPartition,ISNULL(DirectoryInformation,'') as DirectoryInformation,ISNULL(NameOfFiles,'') as NameOfFiles,ISNULL(FileType,'') as FileType,ISNULL(Estimate,'') as Estimate,ISNULL(family,'') as family,ISNULL(EstimatedTime,'') as EstimatedTime,ISNULL(FW,'') as FW,ISNULL(RecoveryPercentage,'') as RecoveryPercentage,ISNULL(CourierCompany,'') as CourierCompany,ISNULL(CourierDocitNO,'') as CourierDocitNO,ISNULL(ASSESSMENTFORM.CourierDate,'') as CourierDate,ISNULL(DataList,'') as DataList,ISNULL(DataListAttachment,'') as DataListAttachment  from ASSESSMENTFORM    right outer Join  Contact ON ASSESSMENTFORM.CID=Contact.CID  Where Contact.username='" + username + "' AND contact.pwd='" + password + "'");
                    string cmdStr = String.Format("Select ISNULL(ea.Email,'') as Email, ISNULL(ea.Mobile,'') as Mobile, ISNULL(ea.Name,'') as Name, ISNULL(ea.Remarks,'') as Remarks, ISNULL(ea.Type,'') as Type, ISNULL(ea.City,'') as City, ISNULL(ea.PromoCode,'') as PromoCode, ISNULL(ea.Country,'') as Country,ISNULL(ea.eauid,0) as eauid ,ea.Language from EasyAccRegData ea WHERE (ea.email='" + email + "' or ea.RegisterEmail='" + email + "')");
                    SqlCommand cmd = new SqlCommand(cmdStr, conn);
                    SqlDataReader rd = cmd.ExecuteReader();
                    if (rd.HasRows)
                    {
                        //return "success";
                        while (rd.Read())
                            GetUserlist.Add(new GetUser(rd.GetString(0), rd.GetString(1), rd.GetString(2), rd.GetString(3), rd.GetString(4), rd.GetString(5), rd.GetString(6), rd.GetString(7), rd.GetInt32(8), rd.GetString(9)));
                    }
                }
                return GetUserlist;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                conn.Close();
                conn.Dispose();


            }
        }

        public List<GetCustomer> GetCustomer(string username, string password)
        {
            SqlConnection conn = new SqlConnection(ConfigurationManager.AppSettings["Rounak"]);
            try
            {
                List<GetCustomer> GetCustomerlist = new List<GetCustomer>();
                using (conn)
                {
                    conn.Open();
                    //string cmdStr = String.Format("Select ISNULL(Contact.CId,0) as CId,ISNULL(ASSESSMENTFORM.JId,0) as JId,ISNULL(JDate,'') as JDate,ISNULL(JNO,'') as JNO,ISNULL(JStatus,'') as JobStatus,ISNULL(CName,'') as CName,ISNULL(Company,'') as Company,ISNULL(Address,'') as Address,ISNULL(Phone,'') as Phone,ISNULL(Mobile1,'') as Mobile1,ISNULL(email,'') as email,ISNULL(ASSESSMENTFORM.MediaType,'') as MediaType,ISNULL(ASSESSMENTFORM.MediaModel,'') as MediaModel,ISNULL(SerialNo,'') as SerialNo,ISNULL(Capacity,'') as Capacity,ISNULL(ASSESSMENTFORM.CapacityIn,'') as CapacityIn,ISNULL(PartNo,'') as PartNo,ISNULL(PCBRev,'') as PCBRev,ISNULL(ASSESSMENTFORM.PCBStiker,'') as PCBStiker,ISNULL(PartFamily,'') as PartFamily,ISNULL(ProblemType,'') as ProblemType,ISNULL(OpenPermitted,'') as OpenPermitted,ISNULL(DetailProblem,'') as DetailProblem,ISNULL(PreviousTry,'') as PreviousTry,ISNULL(NumberOfPartition,'') as NumberOfPartition,ISNULL(SizeofPartition,'') as SizeofPartition,ISNULL(OperatingSystem,'') as OperatingSystem,ISNULL(remarks,'') as remarks,ISNULL(FileSystem,'') as FileSystem,ISNULL(FromPartition,'') as FromPartition,ISNULL(DirectoryInformation,'') as DirectoryInformation,ISNULL(NameOfFiles,'') as NameOfFiles,ISNULL(FileType,'') as FileType,ISNULL(Estimate,'') as Estimate,ISNULL(family,'') as family,ISNULL(EstimatedTime,'') as EstimatedTime,ISNULL(FW,'') as FW,ISNULL(RecoveryPercentage,'') as RecoveryPercentage,ISNULL(CourierCompany,'') as CourierCompany,ISNULL(CourierDocitNO,'') as CourierDocitNO,ISNULL(ASSESSMENTFORM.CourierDate,'') as CourierDate,ISNULL(DataList,'') as DataList,ISNULL(DataListAttachment,'') as DataListAttachment  from ASSESSMENTFORM    right outer Join  Contact ON ASSESSMENTFORM.CID=Contact.CID  Where Contact.username='" + username + "' AND contact.pwd='" + password + "'");
                    string cmdStr = String.Format("Select ISNULL(Contact.CId,0) as CId,ISNULL(ASSESSMENTFORM.JId,0) as JId,ISNULL(JDate,'') as JDate,ISNULL(JNO,'') as JNO,ISNULL(JStatus,'') as JobStatus,ISNULL(CName,'') as CName,ISNULL(Company,'') as Company,ISNULL(Address,'') as Address,ISNULL(Phone,'') as Phone,ISNULL(Mobile1,'') as Mobile1,ISNULL(ASSESSMENTFORM.MediaType,'') as MediaType,ISNULL(email,'') as email,ISNULL(ASSESSMENTFORM.MediaModel,'') as MediaModel,ISNULL(SerialNo,'') as SerialNo,ISNULL(Capacity,'') as Capacity,ISNULL(ASSESSMENTFORM.CapacityIn,'') as CapacityIn,ISNULL(PartNo,'') as PartNo,ISNULL(PCBRev,'') as PCBRev,ISNULL(ASSESSMENTFORM.PCBStiker,'') as PCBStiker,ISNULL(PartFamily,'') as PartFamily,ISNULL(ProblemType,'') as ProblemType,ISNULL(OpenPermitted,'') as OpenPermitted,ISNULL(DetailProblem,'') as DetailProblem,ISNULL(PreviousTry,'') as PreviousTry,ISNULL(NumberOfPartition,'') as NumberOfPartition,ISNULL(SizeofPartition,'') as SizeofPartition,ISNULL(OperatingSystem,'') as OperatingSystem,ISNULL(remarks,'') as remarks,ISNULL(FileSystem,'') as FileSystem,ISNULL(FromPartition,'') as FromPartition,ISNULL(DirectoryInformation,'') as DirectoryInformation,ISNULL(NameOfFiles,'') as NameOfFiles,ISNULL(FileType,'') as FileType,ISNULL(Estimate,'') as Estimate,ISNULL(family,'') as family,ISNULL(EstimatedTime,'') as EstimatedTime,ISNULL(FW,'') as FW,ISNULL(RecoveryPercentage,'') as RecoveryPercentage,ISNULL(CourierCompany,'') as CourierCompany,ISNULL(CourierDocitNO,'') as CourierDocitNO,ISNULL(ASSESSMENTFORM.CourierDate,'') as CourierDate,ISNULL(DataList,'') as DataList,ISNULL(DataListAttachment,'') as DataListAttachment,ISNULL(DiagnosedStatus,'') as DiagnosedStatus  from ASSESSMENTFORM    right outer Join  Contact ON ASSESSMENTFORM.CID=Contact.CID  Where Contact.username='" + username + "' AND contact.pwd='" + password + "' and ISNULL(Contact.IsDeleted,'N')!='Y' AND  ISNULL(ASSESSMENTFORM.IsAssessmentDeleted,'N')!='Y'");
                    SqlCommand cmd = new SqlCommand(cmdStr, conn);
                    SqlDataReader rd = cmd.ExecuteReader();

                    if (rd.HasRows)
                    {
                        //return "success";
                        while (rd.Read())
                            GetCustomerlist.Add(new GetCustomer(rd.GetInt32(0), rd.GetInt32(1), rd.GetDateTime(2), rd.GetString(3), rd.GetString(4), rd.GetString(5), rd.GetString(6), rd.GetString(7), rd.GetString(8), rd.GetString(9), rd.GetString(10), rd.GetString(11), rd.GetString(12), rd.GetString(13), rd.GetString(14), rd.GetString(15), rd.GetString(16), rd.GetString(17), rd.GetString(18), rd.GetString(19), rd.GetString(20), rd.GetString(21), rd.GetString(22), rd.GetString(23), rd.GetString(24), rd.GetString(25), rd.GetString(26), rd.GetString(27), rd.GetString(28), rd.GetString(29), rd.GetString(30), rd.GetString(31), rd.GetString(32), rd.GetString(33), rd.GetString(34), rd.GetString(35), rd.GetString(36), rd.GetString(37), rd.GetString(38), rd.GetString(39), rd.GetDateTime(40), rd.GetString(41), rd.GetString(42), rd.GetString(43)));
                    }
                    //else
                    //{
                    //    return "fail";
                    //}
                    //conn.Close();
                }

                return GetCustomerlist;
            }

            catch (Exception ex)
            {
                throw ex;
            }

            finally
            {
                conn.Close();
                conn.Dispose();


            }
        }

        public string UserQuery(UserQuery uqry)
        {
            try
            {

                conRegisterCustomer = new SqlConnection(ConfigurationManager.AppSettings["Rounak"]);
                cmdRegisterCustomer = new SqlCommand("APY_API_Insert_Query", conRegisterCustomer);
                conRegisterCustomer.Open();
                // conRegisterCustomer.BeginTransaction("Customer");

                cmdRegisterCustomer.CommandType = CommandType.StoredProcedure;
                cmdRegisterCustomer.Parameters.AddWithValue("@CId", uqry.cid);
                cmdRegisterCustomer.Parameters.AddWithValue("@QueryType", uqry.querytype);
                cmdRegisterCustomer.Parameters.AddWithValue("@Description", uqry.description);
                cmdRegisterCustomer.Parameters.AddWithValue("@CreateDate", System.DateTime.Now.ToString("MM/dd/yyyy hh:mm:ss tt"));
                SqlParameter parmOUT = new SqlParameter("@QId", SqlDbType.Int);
                parmOUT.Direction = ParameterDirection.Output;
                cmdRegisterCustomer.Parameters.Add(parmOUT);
                cmdRegisterCustomer.ExecuteNonQuery();
                rows = (int)cmdRegisterCustomer.Parameters["@QId"].Value;

                if (rows == 0)
                {
                    return "fail";
                }

                else if (rows == -2)
                {
                    return "success";
                }
                else
                {
                    return "success";
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

            finally
            {
                conRegisterCustomer.Close();
                conRegisterCustomer.Dispose();
            }
        }

        public string UserDataQueryN(UserDataQueryN usrdqry)
        {
            try
            {

                conRegisterCustomer = new SqlConnection(ConfigurationManager.AppSettings["Rounak"]);
                cmdRegisterCustomer = new SqlCommand("APY_API_Insert_DataQuery", conRegisterCustomer);
                conRegisterCustomer.Open();
                // conRegisterCustomer.BeginTransaction("Customer");

                cmdRegisterCustomer.CommandType = CommandType.StoredProcedure;
                cmdRegisterCustomer.Parameters.AddWithValue("@QDate", System.DateTime.Now.ToString("MM/dd/yyyy hh:mm:ss tt"));
                cmdRegisterCustomer.Parameters.AddWithValue("@QName", usrdqry.qname);
                cmdRegisterCustomer.Parameters.AddWithValue("@QEmail", usrdqry.qemail);
                cmdRegisterCustomer.Parameters.AddWithValue("@QRegisteredEmail", usrdqry.qregisteredemail);
                cmdRegisterCustomer.Parameters.AddWithValue("@QMobile", usrdqry.qmobile);
                cmdRegisterCustomer.Parameters.AddWithValue("@QDescription", usrdqry.qdescription);
                cmdRegisterCustomer.Parameters.AddWithValue("@Remarks", usrdqry.remarks);
                cmdRegisterCustomer.Parameters.AddWithValue("@CreateDate", System.DateTime.Now.ToString("MM/dd/yyyy hh:mm:ss tt"));
                SqlParameter parmOUT = new SqlParameter("@ID", SqlDbType.Int);
                parmOUT.Direction = ParameterDirection.Output;
                cmdRegisterCustomer.Parameters.Add(parmOUT);
                cmdRegisterCustomer.ExecuteNonQuery();
                rows = (int)cmdRegisterCustomer.Parameters["@ID"].Value;



                // return cmdSubscription.ExecuteNonQuery();



                //rows = cmdRegisterCustomer.ExecuteNonQuery();
                if (rows == 0)
                {
                    return "fail";
                }
                else
                {
                    MailMessage mailMessage = new MailMessage();
                    //creating an instance of the MailMessage class 
                    mailMessage.From = "Appy<Appy@visioninfotechonline.com>";// "noreply@redsteth.com";
                    //senders email address 
                    mailMessage.To = "info@waytoappy.com";//qwi.email; //txtEmail.Text.Trim();
                    //recipient's email address 
                    //mailMessage.Cc = txtEmail.Text.Trim();
                    //email address of the Cc recipient 
                    //mailMessage.Bcc = "redsteth2010@gmail.com";//pwd : rsteth#3579
                    //email address of the Bcc recipient 
                    mailMessage.Subject = "New query from  " + usrdqry.qname;//objSubscription.pSubject;// "Subscription Request Received";// + Session["NewGenId"].ToString();
                    //subject of the email message 
                    mailMessage.BodyFormat = MailFormat.Html;
                    //message text format. Can be text or html 
                    mailMessage.Body = "Name " + usrdqry.qname + "<br />Mobile " + usrdqry.qmobile + "<br />Email " + usrdqry.qemail + "<br />Date " + DateTime.Now.ToString("MM/dd/yyyy hh:mm:ss tt") + "<br />Description " + usrdqry.qdescription + "<br />Remarks " + usrdqry.remarks;// +Footer;//"<HTML><HEAD><TITLE></TITLE></HEAD><BODY><h5>Dear " + objSubscription.pName + "<br>Sender Id: " + /*Session["jName"].ToString() +*/"<br>CustomerId: " +/*Session["jName"].ToString() +*/ "<br>Mobile: " + /*Session["jName"].ToString() +*/ "<br>Email Id: " +/*Session["jName"].ToString() +*/ "<br>Subscription Date: " + /*Session["jName"].ToString() +*/ "<br>UserName: " + /*Session["jName"].ToString() +*/"<br>Password: " +/*Session["jName"].ToString() +*/ "</h5></BODY></HTML>";

                    //message body 
                    mailMessage.Priority = MailPriority.High;
                    //email priority. Can be low, normal or high 


                    mailMessage.Fields.Add("http://schemas.microsoft.com/cdo/configuration/smtpauthenticate", "1"); //basic authentication
                    mailMessage.Fields.Add("http://schemas.microsoft.com/cdo/configuration/sendusername", "Appy@visioninfotechonline.com"); //set your username here
                    mailMessage.Fields.Add("http://schemas.microsoft.com/cdo/configuration/sendpassword", "Xivb615&");  //set your password here //medicoz#3579

                    SmtpMail.SmtpServer = "mail.visioninfotechonline.com";//"74.63.254.213";// "mail.dawaiwale.com";// "174.36.220.176";// "69.65.43.156";//"70.87.29.14";// "mail.medicozlemon.com";//"smtp.medicozlemon.com";// "mail.redsteth.com";// "69.65.43.156";
                    //mail server used to send this email. modify this line based on your mail server 


                    try
                    {
                        SmtpMail.Send(mailMessage);
                        //SendSMS("9425055817", "new query:Name " + usrdqry.qname + ";Mobile " + usrdqry.qmobile + ";Email " + usrdqry.qemail + ";Date " + DateTime.Now.ToString("MM/dd/yyyy hh:mm:ss tt") + ";Description " + usrdqry.qdescription + ";Remarks " + usrdqry.remarks); 

                        //Response.Write("Mail sent");
                        //Valid = true;
                    }

                    catch
                    {
                        //Valid = false;
                        //throw;

                    }
                    return "success";
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

            finally
            {
                conRegisterCustomer.Close();
                conRegisterCustomer.Dispose();


            }
        }

        public string RegisterAppyUserGCMId(RegisterAppyGCMId register)
        {
            try
            {

                conRegisterCustomer = new SqlConnection(ConfigurationManager.AppSettings["Rounak"]);
                cmdRegisterCustomer = new SqlCommand("Appy_API_Insert_UserForGCMId", conRegisterCustomer);
                conRegisterCustomer.Open();
                // conRegisterCustomer.BeginTransaction("Customer");

                cmdRegisterCustomer.CommandType = CommandType.StoredProcedure;
                cmdRegisterCustomer.Parameters.AddWithValue("@Email", register.email);
                //cmdRegisterCustomer.Parameters.AddWithValue("@RegisteredEmail", register.registeredemail);
                //cmdRegisterCustomer.Parameters.AddWithValue("@Mobile", register.mobile);
                cmdRegisterCustomer.Parameters.AddWithValue("@Model", register.model);
                cmdRegisterCustomer.Parameters.AddWithValue("@IMEI", register.imei);
                cmdRegisterCustomer.Parameters.AddWithValue("@GCMId", register.gcmid);
                cmdRegisterCustomer.Parameters.AddWithValue("@AppId", register.appid);
                cmdRegisterCustomer.Parameters.AddWithValue("@Createdate", System.DateTime.Now.ToString("MM/dd/yyyy hh:mm:ss tt"));


                SqlParameter parmOUT = new SqlParameter("@Id", SqlDbType.Int);
                parmOUT.Direction = ParameterDirection.Output;
                cmdRegisterCustomer.Parameters.Add(parmOUT);
                cmdRegisterCustomer.ExecuteNonQuery();
                rows = (Int32)cmdRegisterCustomer.Parameters["@Id"].Value;
                if (rows == 0)
                {
                    return "fail";
                }

                else
                {

                    return "success";
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

            finally
            {
                conRegisterCustomer.Close();
                conRegisterCustomer.Dispose();


            }
        }

        public string ForgotPassword(string type, string value, string countryCode)
        {
            try
            {
                string Password = string.Empty;
                conRegisterCustomer = new SqlConnection(ConfigurationManager.AppSettings["Rounak"]);
                cmdRegisterCustomer = new SqlCommand("AP_API_Forgot_Password", conRegisterCustomer);
                conRegisterCustomer.Open();
                // conRegisterCustomer.BeginTransaction("Customer");

                cmdRegisterCustomer.CommandType = CommandType.StoredProcedure;
                cmdRegisterCustomer.Parameters.AddWithValue("@type", type);
                cmdRegisterCustomer.Parameters.AddWithValue("@value", value);
                SqlParameter parmOUT = new SqlParameter("@Password", SqlDbType.NVarChar);
                parmOUT.Size = 50;
                parmOUT.Direction = ParameterDirection.Output;
                cmdRegisterCustomer.Parameters.Add(parmOUT);
                cmdRegisterCustomer.ExecuteNonQuery();
                Password = (string)cmdRegisterCustomer.Parameters["@Password"].Value;
                if (Password == "" || Password.Length == 0)
                {
                    return "fail";
                }

                else if (Password == "-2")
                {
                    return "Email/Mobile Not Exist";
                }

                if (type.ToLower() == "email")
                {

                    MailMessage mailMessage = new MailMessage();

                    mailMessage.From = "Appy<Appy@visioninfotechonline.com>";// "noreply@redsteth.com";
                                                                             //senders email address 
                    mailMessage.To = value; //txtEmail.Text.Trim();
                                            //recipient's email address 
                                            //mailMessage.Cc = txtEmail.Text.Trim();
                                            //email address of the Cc recipient 
                                            //mailMessage.Bcc = "redsteth2010@gmail.com";//pwd : rsteth#3579
                                            //email address of the Bcc recipient 
                    mailMessage.Subject = "Your Appy password";
                    mailMessage.BodyFormat = MailFormat.Html;
                    //message text format. Can be text or html 
                    mailMessage.Body = "You have requested to send the password.<br /> Your password is:" + Password;
                    //message body 
                    mailMessage.Priority = MailPriority.High;
                    mailMessage.Fields.Add("http://schemas.microsoft.com/cdo/configuration/smtpauthenticate", "1"); //basic authentication
                    mailMessage.Fields.Add("http://schemas.microsoft.com/cdo/configuration/sendusername", "Appy@visioninfotechonline.com"); //set your username here
                    mailMessage.Fields.Add("http://schemas.microsoft.com/cdo/configuration/sendpassword", "Xivb615&");  //set your password here //medicoz#3579

                    SmtpMail.SmtpServer = "mail.visioninfotechonline.com";//"74.63.254.213";// "mail.dawaiwale.com";// "174.36.220.176";// "69.65.43.156";//"70.87.29.14";// "mail.medicozlemon.com";//"smtp.medicozlemon.com";// "mail.redsteth.com";// "69.65.43.156";
                                                                          //mail server used to send this email. modify this line based on your mail server 


                    SmtpMail.Send(mailMessage);
                    return "Password sent on given email Address";
                }
                else
                {
                    SendSMS(countryCode + value, "You have requested to send the password. Your password is: " + Password);
                    return "Password sent on mobile inbox";
                }
                //Response.Write("Mail sent");
                //Valid = true;




                return "success";

            }
            catch (Exception ex)
            {
                return ex.Message;
            }

            finally
            {
                conRegisterCustomer.Close();
                conRegisterCustomer.Dispose();
            }
        }

        public string SendOTP_sms(SendSMS obj)
        {
            try
            {
                Random rndm = new Random();
                Int32 OTP = rndm.Next(100000, 999999);
                SendSMS(obj.mobile, Convert.ToString(OTP));
                return Convert.ToString(OTP);

            }
            catch (Exception ex)
            {
                return ex.Message;
            }

            finally
            {
            }
        }
        public string SendOTP(string mobile)
        {
            try
            {
                Random rndm = new Random();
                Int32 OTP = rndm.Next(100000, 999999);
                SendSMS(mobile, Convert.ToString(OTP));
                return Convert.ToString(OTP);

            }
            catch (Exception ex)
            {
                return ex.Message;
            }

            finally
            {
            }
        }

        public string UpdateEmail(UpdateEmail updeml)
        {
            try
            {
                conRegisterCustomer = new SqlConnection(ConfigurationManager.AppSettings["Rounak"]);
                cmdRegisterCustomer = new SqlCommand("Appy_API_Update_Email", conRegisterCustomer);
                conRegisterCustomer.Open();

                cmdRegisterCustomer.CommandType = CommandType.StoredProcedure;

                cmdRegisterCustomer.Parameters.AddWithValue("@EAUId", updeml.eauid);
                cmdRegisterCustomer.Parameters.AddWithValue("@CurrentEmail", updeml.currentemail);
                cmdRegisterCustomer.Parameters.AddWithValue("@NewEmail", updeml.newemail);

                cmdRegisterCustomer.Parameters.AddWithValue("@EditDate", System.DateTime.Now.ToString("MM/dd/yyyy hh:mm:ss tt"));
                SqlParameter parmOUT = new SqlParameter("@ID", SqlDbType.Int);
                parmOUT.Direction = ParameterDirection.Output;
                cmdRegisterCustomer.Parameters.Add(parmOUT);
                cmdRegisterCustomer.ExecuteNonQuery();
                rows = (int)cmdRegisterCustomer.Parameters["@ID"].Value;

                if (rows == 0)
                {
                    return "fail";
                }
                else if (rows == -3)
                {
                    return "Current Email Not Exists";
                }
                else if (rows == -6)
                {
                    return "New Email alreday Exists";
                }
                else
                {

                    return "success";
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

            finally
            {
                conRegisterCustomer.Close();
                conRegisterCustomer.Dispose();
            }
        }
        public string UpdateProfile(UpdateProfile updprfl)
        {
            try
            {

                conRegisterCustomer = new SqlConnection(ConfigurationManager.AppSettings["Rounak"]);
                cmdRegisterCustomer = new SqlCommand("Appy_API_Update_User", conRegisterCustomer);
                conRegisterCustomer.Open();
                // conRegisterCustomer.BeginTransaction("Customer");

                cmdRegisterCustomer.CommandType = CommandType.StoredProcedure;

                cmdRegisterCustomer.Parameters.AddWithValue("@User", updprfl.user);
                cmdRegisterCustomer.Parameters.AddWithValue("@Pwd", updprfl.pwd);
                cmdRegisterCustomer.Parameters.AddWithValue("@Name", updprfl.name);
                cmdRegisterCustomer.Parameters.AddWithValue("@Email", updprfl.email);
                cmdRegisterCustomer.Parameters.AddWithValue("@Promocode", updprfl.promocode);
                cmdRegisterCustomer.Parameters.AddWithValue("@Mobile", updprfl.mobile);
                cmdRegisterCustomer.Parameters.AddWithValue("@City", updprfl.city);
                cmdRegisterCustomer.Parameters.AddWithValue("@Country", updprfl.country);
                cmdRegisterCustomer.Parameters.AddWithValue("@Remarks", updprfl.remarks);
                cmdRegisterCustomer.Parameters.AddWithValue("@Language", updprfl.Language);
                cmdRegisterCustomer.Parameters.AddWithValue("@EditDate", System.DateTime.Now.ToString("MM/dd/yyyy hh:mm:ss tt"));
                SqlParameter parmOUT = new SqlParameter("@EAUID", SqlDbType.Int);
                parmOUT.Direction = ParameterDirection.Output;
                cmdRegisterCustomer.Parameters.Add(parmOUT);
                cmdRegisterCustomer.ExecuteNonQuery();
                rows = (int)cmdRegisterCustomer.Parameters["@EAUID"].Value;
                if (rows == 0)
                {
                    return "fail";
                }

                else if (rows == -3)
                {
                    return "Email Exists";
                }
                else if (rows == -6)
                {
                    return "Mobile Exists";
                }
                else
                {
                    return "success";
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

            finally
            {
                conRegisterCustomer.Close();
                conRegisterCustomer.Dispose();


            }
        }

        public string UpdatePassword(UpdatePassword updpwd)
        {
            try
            {

                conRegisterCustomer = new SqlConnection(ConfigurationManager.AppSettings["Rounak"]);
                cmdRegisterCustomer = new SqlCommand("Appy_API_Update_Pwd", conRegisterCustomer);
                conRegisterCustomer.Open();
                // conRegisterCustomer.BeginTransaction("Customer");

                cmdRegisterCustomer.CommandType = CommandType.StoredProcedure;
                cmdRegisterCustomer.Parameters.AddWithValue("@User", updpwd.user);
                cmdRegisterCustomer.Parameters.AddWithValue("@OldPwd", updpwd.oldpwd);
                cmdRegisterCustomer.Parameters.AddWithValue("@NewPwd", updpwd.newpwd);

                SqlParameter parmOUT = new SqlParameter("@EAUID", SqlDbType.Int);
                parmOUT.Direction = ParameterDirection.Output;
                cmdRegisterCustomer.Parameters.Add(parmOUT);
                cmdRegisterCustomer.ExecuteNonQuery();
                rows = (int)cmdRegisterCustomer.Parameters["@EAUID"].Value;
                if (rows == 0)
                {
                    return "fail";
                }

                else if (rows == -2)
                {
                    return "success";
                }
                else
                {
                    return "success";
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

            finally
            {
                conRegisterCustomer.Close();
                conRegisterCustomer.Dispose();
            }
        }

        public string UserMessage(UserMessage usrmsg)
        {
            try
            {
                conRegisterCustomer = new SqlConnection(ConfigurationManager.AppSettings["Rounak"]);
                cmdRegisterCustomer = new SqlCommand("Appy_API_Insert_UserMessage", conRegisterCustomer);
                conRegisterCustomer.Open();
                cmdRegisterCustomer.CommandType = CommandType.StoredProcedure;
                cmdRegisterCustomer.Parameters.AddWithValue("@EId", usrmsg.eid);
                cmdRegisterCustomer.Parameters.AddWithValue("@Sub", usrmsg.sub);
                cmdRegisterCustomer.Parameters.AddWithValue("@Desc", usrmsg.desc);
                cmdRegisterCustomer.Parameters.AddWithValue("@Enable", usrmsg.enable);

                SqlParameter parmOUT = new SqlParameter("@MsgId", SqlDbType.Int);
                parmOUT.Direction = ParameterDirection.Output;
                cmdRegisterCustomer.Parameters.Add(parmOUT);
                cmdRegisterCustomer.ExecuteNonQuery();
                rows = (int)cmdRegisterCustomer.Parameters["@MsgId"].Value;

                if (rows == 0)
                {
                    return "fail";
                }

                else if (rows == -2)
                {
                    return "success";
                }
                else
                {
                    return "success";
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

            finally
            {
                conRegisterCustomer.Close();
                conRegisterCustomer.Dispose();
            }
        }
        public string UpdatePrivateMessage(UserMessage usrmsg)
        {
            try
            {
                conRegisterCustomer = new SqlConnection(ConfigurationManager.AppSettings["Rounak"]);
                cmdRegisterCustomer = new SqlCommand("Appy_API_Update_Delete_UserMessage", conRegisterCustomer);
                conRegisterCustomer.Open();
                cmdRegisterCustomer.CommandType = CommandType.StoredProcedure;
                cmdRegisterCustomer.Parameters.AddWithValue("@MsgId", usrmsg.msgid);
                cmdRegisterCustomer.Parameters.AddWithValue("@Sub", usrmsg.sub);
                cmdRegisterCustomer.Parameters.AddWithValue("@Desc", usrmsg.desc);
                cmdRegisterCustomer.Parameters.AddWithValue("@Qtype", "U");
                cmdRegisterCustomer.ExecuteNonQuery();

                return "Success";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
            finally
            {
                conRegisterCustomer.Close();
                conRegisterCustomer.Dispose();
            }
        }
        public string DeletePrivateMessage(UserMessage usrmsg)
        {
            try
            {
                conRegisterCustomer = new SqlConnection(ConfigurationManager.AppSettings["Rounak"]);
                cmdRegisterCustomer = new SqlCommand("Appy_API_Update_Delete_UserMessage", conRegisterCustomer);
                conRegisterCustomer.Open();
                cmdRegisterCustomer.CommandType = CommandType.StoredProcedure;
                cmdRegisterCustomer.Parameters.AddWithValue("@MsgId", usrmsg.msgid);
                cmdRegisterCustomer.Parameters.AddWithValue("@Qtype", "D");
                cmdRegisterCustomer.ExecuteNonQuery();
                return "Success";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
            finally
            {
                conRegisterCustomer.Close();
                conRegisterCustomer.Dispose();
            }
        }
        public List<GetUserMessage> GetUserMessage(string eid)
        {
            SqlConnection conn = new SqlConnection(ConfigurationManager.AppSettings["Rounak"]);
            try
            {
                List<GetUserMessage> GetUserMessagelist = new List<GetUserMessage>();

                using (conn)
                {
                    conn.Open();
                    //string cmdStr = String.Format("Select ISNULL(Contact.CId,0) as CId,ISNULL(ASSESSMENTFORM.JId,0) as JId,ISNULL(JDate,'') as JDate,ISNULL(JNO,'') as JNO,ISNULL(JStatus,'') as JobStatus,ISNULL(CName,'') as CName,ISNULL(Company,'') as Company,ISNULL(Address,'') as Address,ISNULL(Phone,'') as Phone,ISNULL(Mobile1,'') as Mobile1,ISNULL(email,'') as email,ISNULL(ASSESSMENTFORM.MediaType,'') as MediaType,ISNULL(ASSESSMENTFORM.MediaModel,'') as MediaModel,ISNULL(SerialNo,'') as SerialNo,ISNULL(Capacity,'') as Capacity,ISNULL(ASSESSMENTFORM.CapacityIn,'') as CapacityIn,ISNULL(PartNo,'') as PartNo,ISNULL(PCBRev,'') as PCBRev,ISNULL(ASSESSMENTFORM.PCBStiker,'') as PCBStiker,ISNULL(PartFamily,'') as PartFamily,ISNULL(ProblemType,'') as ProblemType,ISNULL(OpenPermitted,'') as OpenPermitted,ISNULL(DetailProblem,'') as DetailProblem,ISNULL(PreviousTry,'') as PreviousTry,ISNULL(NumberOfPartition,'') as NumberOfPartition,ISNULL(SizeofPartition,'') as SizeofPartition,ISNULL(OperatingSystem,'') as OperatingSystem,ISNULL(remarks,'') as remarks,ISNULL(FileSystem,'') as FileSystem,ISNULL(FromPartition,'') as FromPartition,ISNULL(DirectoryInformation,'') as DirectoryInformation,ISNULL(NameOfFiles,'') as NameOfFiles,ISNULL(FileType,'') as FileType,ISNULL(Estimate,'') as Estimate,ISNULL(family,'') as family,ISNULL(EstimatedTime,'') as EstimatedTime,ISNULL(FW,'') as FW,ISNULL(RecoveryPercentage,'') as RecoveryPercentage,ISNULL(CourierCompany,'') as CourierCompany,ISNULL(CourierDocitNO,'') as CourierDocitNO,ISNULL(ASSESSMENTFORM.CourierDate,'') as CourierDate,ISNULL(DataList,'') as DataList,ISNULL(DataListAttachment,'') as DataListAttachment  from ASSESSMENTFORM    right outer Join  Contact ON ASSESSMENTFORM.CID=Contact.CID  Where Contact.username='" + username + "' AND contact.pwd='" + password + "'");
                    string cmdStr = String.Format("Select ISNULL(MsgId,0) as MsgId,ISNULL(eid,0) as eid,ISNULL(sub,'') as sub,ISNULL([desc],'') as [desc],ISNULL([enable],0) as enable from UserMessages Where eid='" + eid + "'");
                    SqlCommand cmd = new SqlCommand(cmdStr, conn);
                    SqlDataReader rd = cmd.ExecuteReader();

                    if (rd.HasRows)
                    {
                        //return "success";
                        while (rd.Read())
                            GetUserMessagelist.Add(new GetUserMessage(rd.GetInt32(0), rd.GetInt32(1), rd.GetString(2), rd.GetString(3), rd.GetBoolean(4)));
                    }

                }

                return GetUserMessagelist;
            }

            catch (Exception ex)
            {
                throw ex;
            }

            finally
            {
                conn.Close();
                conn.Dispose();


            }
        }
        public string UpdateUserMessage(UpdateUserMessage updusrmsg)
        {
            try
            {

                conRegisterCustomer = new SqlConnection(ConfigurationManager.AppSettings["Rounak"]);
                cmdRegisterCustomer = new SqlCommand("Appy_API_Insert_Update_UserMessage", conRegisterCustomer);
                conRegisterCustomer.Open();
                // conRegisterCustomer.BeginTransaction("Customer");

                cmdRegisterCustomer.CommandType = CommandType.StoredProcedure;
                cmdRegisterCustomer.Parameters.AddWithValue("@MsgId", updusrmsg.msgid);
                cmdRegisterCustomer.Parameters.AddWithValue("@Enable", updusrmsg.enable);


                cmdRegisterCustomer.ExecuteNonQuery();
                return "success";
                //}
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

            finally
            {
                conRegisterCustomer.Close();
                conRegisterCustomer.Dispose();


            }
        }

        public List<GetToolsTechs> GetToolsTechs(string LID)
        {
            try
            {
                conRegisterCustomer = new SqlConnection(ConfigurationManager.AppSettings["Rounak"]);
                conRegisterCustomer.Open();
                string cmdStr = "Select * from ToolsTechs where  LId='" + LID + "'  order by TTId desc";
                SqlCommand cmd = new SqlCommand(cmdStr, conRegisterCustomer);
                SqlDataReader rd = cmd.ExecuteReader();
                List<GetToolsTechs> GetToolsTechslist = new List<GetToolsTechs>();
                if (rd.HasRows)
                {
                    while (rd.Read())
                        GetToolsTechslist.Add(new GetToolsTechs(rd.GetString(1), rd.GetString(2)));
                }
                return GetToolsTechslist;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                conRegisterCustomer.Close();
                conRegisterCustomer.Dispose();
            }
        }
        public List<GetScreenMessage> GetScreenMessage()
        {
            try
            {
                conRegisterCustomer = new SqlConnection(ConfigurationManager.AppSettings["Rounak"]);
                conRegisterCustomer.Open();
                string cmdStr = "Select * from ScreenMessage";
                SqlCommand cmd = new SqlCommand(cmdStr, conRegisterCustomer);
                SqlDataReader rd = cmd.ExecuteReader();
                List<GetScreenMessage> GetToolsTechslist = new List<GetScreenMessage>();
                if (rd.HasRows)
                {
                    while (rd.Read())
                        GetToolsTechslist.Add(new GetScreenMessage(rd.GetString(1), rd.GetString(2)));
                }
                return GetToolsTechslist;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                conRegisterCustomer.Close();
                conRegisterCustomer.Dispose();
            }
        }

        public List<Languages> GetLanguages()
        {
            try
            {
                conRegisterCustomer = new SqlConnection(ConfigurationManager.AppSettings["Rounak"]);
                conRegisterCustomer.Open();
                string cmdStr = "SELECT LId, Language FROM dbo.Languages";
                SqlCommand cmd = new SqlCommand(cmdStr, conRegisterCustomer);
                SqlDataReader rd = cmd.ExecuteReader();
                List<Languages> GetToolsTechslist = new List<Languages>();
                if (rd.HasRows)
                {
                    while (rd.Read())
                        GetToolsTechslist.Add(new Languages(rd.GetInt32(0), rd.GetString(1)));
                }
                return GetToolsTechslist;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                conRegisterCustomer.Close();
                conRegisterCustomer.Dispose();
            }
        }


        public string SendUserMessage(SendUserMessage sumsg)
        {
            try
            {

                conRegisterCustomer = new SqlConnection(ConfigurationManager.AppSettings["Rounak"]);
                cmdRegisterCustomer = new SqlCommand("APY_API_Insert_UserMessage", conRegisterCustomer);
                conRegisterCustomer.Open();
                // conRegisterCustomer.BeginTransaction("Customer");

                cmdRegisterCustomer.CommandType = CommandType.StoredProcedure;
                //cmdRegisterCustomer.Connection.BeginTransaction();
                //cmdRegisterCustomer.Connection.
                //cmdRegisterCustomer.Parameters.AddWithValue("@CustId", objRegisterCustomer.pCustId);
                cmdRegisterCustomer.Parameters.AddWithValue("@MId", sumsg.mid);
                cmdRegisterCustomer.Parameters.AddWithValue("@Message", sumsg.message);
                cmdRegisterCustomer.Parameters.AddWithValue("@Mobile", sumsg.mobile);

                SqlParameter parmOUT = new SqlParameter("@TId", SqlDbType.Int);
                parmOUT.Direction = ParameterDirection.Output;
                cmdRegisterCustomer.Parameters.Add(parmOUT);
                cmdRegisterCustomer.ExecuteNonQuery();
                rows = (int)cmdRegisterCustomer.Parameters["@TId"].Value;



                // return cmdSubscription.ExecuteNonQuery();



                //rows = cmdRegisterCustomer.ExecuteNonQuery();
                if (rows == 0)
                {
                    return "fail";
                }

                else
                {
                    SendSMS(sumsg.mobile, sumsg.message);
                    return "success";
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

            finally
            {
                conRegisterCustomer.Close();
                conRegisterCustomer.Dispose();


            }
        }
        //http://msg.cyberdairy.com/rest/services/sendSMS/sendGroupSms?AUTH_KEY=9c801c3e46cd6e1eace1dc3a5d3a989&message=TestFromDT&senderId=DTATRK&routeId=1&mobileNos=9926572400&smsContentType=english
        public void SendSMS(string strRecip, string strMsgText)
        {
            //Uri objURI = new Uri("http://msg.cyberdairy.com/rest/services/sendSMS/sendGroupSms?AUTH_KEY=2deb435d91bfb3f654c4856c7bf09722&senderId=TOAPPY&routeId=1&smsContentType=english&mobileNos=" + strRecip + "&message=" + HttpUtility.UrlEncode(strMsgText));
            //WebRequest objWebRequest = WebRequest.Create(objURI);
            //WebResponse objWebResponse = objWebRequest.GetResponse();
            //Stream objStream = objWebResponse.GetResponseStream();
            //StreamReader objStreamReader = new StreamReader(objStream);
            //string strHTML = objStreamReader.ReadToEnd(); ;

            RestAPI plivo = new RestAPI("MAZTNLMDDJN2EXYTRHNJ", "ZDk4MDIzZjJjODZkYzU4MGE2NGE2ZWNkMjkxMWQx");
            IRestResponse<MessageResponse> resp = plivo.send_message(new Dictionary<string, string>()
                {
                    { "src", "+18053165443" },
                    { "dst",  "+"+strRecip},
                    { "text", strMsgText }
                });
        }
        //  return resp.StatusCode.ToString();

    }

}

