
namespace Altova
{
	public partial class StyleVisionWebApp: System.Web.UI.Page
	{
		public static StyleVisionWebApp s_oSingleton = new StyleVisionWebApp();

		public string Main()
		{
			string sFileNameXslt	= Server.MapPath("variablelisthtml.xslt");
			string sXmlInstance		= "";
			object oResult;
			string sRetval			= "";
			string sError			= "";

			// Get the AltovaXML assembly and create an application object
			System.Reflection.Assembly	oAssembly		= System.Reflection.Assembly.LoadWithPartialName("Altova.AltovaXML");
			object						oAltovaXmlApp	= oAssembly.CreateInstance("Altova.AltovaXML.ApplicationClass");

			// Get the XSLT1 or XSLT2 property
			object oPropertyXslt = oAltovaXmlApp.GetType().GetProperty("XSLT2").GetValue(oAltovaXmlApp, null);

			// Supply the XSLT file (set the XSLT2 property's XSLFileName property)
			oPropertyXslt.GetType().GetProperty("XSLFileName").SetValue(oPropertyXslt, sFileNameXslt, null);

				// Supply XML for main schema source "XML" (type XSD)

			oPropertyXslt.GetType().GetProperty("InputXMLFileName").SetValue(oPropertyXslt, "E:\\LearnGreenBuildings\\XML\\published/Building.xml", null);

				// Run the XSL transformation (call the XSLT property's ExecuteAndGetResultAsString method)

			if (sError == "")
			{
				try
				{
					oResult = oPropertyXslt.GetType().GetMethod("ExecuteAndGetResultAsStringWithBaseOutputURI").Invoke(oPropertyXslt, new string[]{"E:\\LearnGreenBuildings\\XML\\published" + "/"});

					sRetval = (string) oResult;
				}
				catch (System.Exception oException)
				{
					sError = (string) oPropertyXslt.GetType().GetProperty("LastErrorMessage").GetValue(oPropertyXslt, null);
	
					if (sError == "")
					{
						sError= oException.ToString();
					}
				}
			}

				//

			if (sError != "")
			{
				sRetval  = "<html><head><title>variablelist</title></head><body>";
				sRetval += "<h3>The application \"variablelist\" encountered an error</h3>";
				sRetval += "<p>The error text is:</p>";
				sRetval += "<pre style=\"border-top:solid black 1px; border-bottom:solid black 1px; font-family:courier; padding:5mm\">" + sError + "</pre>";
				sRetval += "</body></html>";
			}

			System.Runtime.InteropServices.Marshal.ReleaseComObject(oPropertyXslt);
			oPropertyXslt = null;

			System.Runtime.InteropServices.Marshal.ReleaseComObject(oAltovaXmlApp);
			oAltovaXmlApp = null;

			return sRetval;
		}
	}
}
