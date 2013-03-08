<?xml version="1.0" encoding="UTF-8"?>
<structure version="16" html-doctype="HTML4 Transitional" compatibility-view="IE9" relativeto="*SPS" encodinghtml="UTF-8" encodingrtf="ISO-8859-1" encodingpdf="UTF-8" useimportschema="1" embed-images="1" pastemode="xml" enable-authentic-scripts="1" authentic-scripts-in-debug-mode-external="0" generated-file-location="DEFAULT">
	<parameters/>
	<schemasources>
		<namespaces/>
		<schemasources>
			<xsdschemasource name="XML" main="1" schemafile="Data.xsd" workingxmlfile="Data.xml"/>
		</schemasources>
	</schemasources>
	<modules/>
	<flags>
		<scripts/>
		<mainparts/>
		<globalparts/>
		<designfragments/>
		<pagelayouts/>
		<xpath-functions/>
	</flags>
	<scripts>
		<script language="javascript"/>
	</scripts>
	<script-project>
		<Project version="2" app="AuthenticView"/>
	</script-project>
	<importedxslt/>
	<globalstyles>
		<rules selector=".info">
			<media>
				<media value="all"/>
			</media>
			<rule background-color="#f6f6ff" border="1px solid navy" color="navy" font-weight="bold" margin-bottom="12px" margin-top="12px" padding="2px"/>
		</rules>
		<rules selector=".explanation">
			<media>
				<media value="all"/>
			</media>
			<rule color="blue" font-style="italic" margin-bottom="12px"/>
		</rules>
	</globalstyles>
	<mainparts>
		<children>
			<globaltemplate subtype="main" match="/">
				<document-properties/>
				<children>
					<documentsection>
						<properties columncount="1" columngap="0.50in" headerfooterheight="variable" pagemultiplepages="0" pagenumberingformat="1" pagenumberingstartat="auto" pagestart="next" paperheight="11.69in" papermarginbottom="0.79in" papermarginfooter="0.0in" papermarginheader="0.0in" papermarginleft="0.6in" papermarginright="0.6in" papermargintop="0.79in" paperwidth="8.27in"/>
						<watermark>
							<image transparency="50" fill-page="1" center-if-not-fill="1"/>
							<text transparency="50"/>
						</watermark>
					</documentsection>
					<paragraph paragraphtag="h2">
						<styles border-bottom="2px solid navy" color="navy"/>
						<children>
							<text fixtext="Example: Combo Boxes"/>
						</children>
					</paragraph>
					<paragraph paragraphtag="p">
						<properties class="info"/>
						<children>
							<text fixtext="This example demonstrates combo boxes and how to populate their entries."/>
						</children>
					</paragraph>
					<template subtype="source" match="XML">
						<children>
							<template subtype="element" match="data">
								<children>
									<template subtype="element" match="strings">
										<children>
											<paragraph paragraphtag="p">
												<properties class="explanation"/>
												<children>
													<text fixtext="The entries of a combo box can be defined in one of 3 ways. Right click on the combo boxes below and choose &quot;Edit combo box entry values...&quot; from the context menu to see how each one is defined."/>
												</children>
											</paragraph>
											<paragraph paragraphtag="p">
												<properties class="explanation"/>
												<children>
													<text fixtext="1.) using an enumeration that is defined in the schema. In this way you are guaranteed that whatever the user chooses, it is a schema-valid value."/>
												</children>
											</paragraph>
											<template subtype="attribute" match="selected">
												<children>
													<combobox enumeration="1">
														<children>
															<content subtype="regular">
																<format basic-type="xsd" datatype="string"/>
															</content>
														</children>
													</combobox>
												</children>
												<variables/>
											</template>
											<newline/>
											<paragraph paragraphtag="p">
												<properties class="explanation"/>
												<children>
													<text fixtext="2.) with a user-defined list. Here, we also specified a different display string for every possible XML entry. In this way you can provide readable entries in order to mask sometimes cryptic XML values."/>
												</children>
											</paragraph>
											<template subtype="attribute" match="selected">
												<children>
													<combobox>
														<children>
															<content subtype="regular">
																<format basic-type="xsd" datatype="string"/>
															</content>
														</children>
														<selectoption description="The first entry" value="One"/>
														<selectoption description="The second entry" value="Three"/>
														<selectoption description="The third entry" value="Two"/>
													</combobox>
												</children>
												<variables/>
											</template>
											<newline/>
											<paragraph paragraphtag="p">
												<properties class="explanation"/>
												<children>
													<text fixtext="3.) using an XPath expression. Using this method you can fill the combo box with entries that reside somewhere else in the XML file, or in a different XML file altogether."/>
												</children>
											</paragraph>
											<template subtype="attribute" match="selected">
												<children>
													<combobox xpath="../string">
														<children>
															<content subtype="regular">
																<format basic-type="xsd" datatype="string"/>
															</content>
														</children>
													</combobox>
												</children>
												<variables/>
											</template>
											<line/>
										</children>
										<variables/>
									</template>
								</children>
								<variables/>
							</template>
						</children>
						<variables/>
					</template>
				</children>
			</globaltemplate>
		</children>
	</mainparts>
	<globalparts/>
	<designfragments/>
	<xmltables/>
	<authentic-custom-toolbar-buttons/>
</structure>
