<?xml version="1.0" encoding="UTF-8"?>
<structure version="16" html-doctype="HTML4 Transitional" compatibility-view="IE7" relativeto="*SPS" encodinghtml="UTF-8" encodingrtf="ISO-8859-1" encodingpdf="UTF-8" useimportschema="1" embed-images="1" enable-authentic-scripts="1" authentic-scripts-in-debug-mode-external="0" generated-file-location="DEFAULT">
	<parameters/>
	<schemasources>
		<namespaces>
			<nspair prefix="hpb" uri="http://www.learnhpb.org/schemas/learn-hpb"/>
		</namespaces>
		<schemasources>
			<xsdschemasource name="XML" main="1" schemafile="learnHPBv2.xsd" workingxmlfile="LearnHPBv2.xml"/>
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
	<globalstyles/>
	<mainparts>
		<children>
			<globaltemplate subtype="main" match="/">
				<document-properties/>
				<children>
					<documentsection>
						<properties columncount="1" columngap="0.50in" headerfooterheight="fixed" pagemultiplepages="0" pagenumberingformat="1" pagenumberingstartat="auto" pagestart="next" paperheight="11in" papermarginbottom="0.79in" papermarginfooter="0.30in" papermarginheader="0.30in" papermarginleft="0.60in" papermarginright="0.60in" papermargintop="0.79in" paperwidth="8.50in"/>
						<watermark>
							<image transparency="50" fill-page="1" center-if-not-fill="1"/>
							<text transparency="50"/>
						</watermark>
					</documentsection>
					<template subtype="source" match="XML">
						<children>
							<template subtype="element" match="hpb:scenario">
								<children>
									<newline/>
									<template subtype="element" match="hpb:component">
										<children>
											<template subtype="element" match="hpb:system-ref">
												<children>
													<newline/>
													<newline/>
													<template subtype="attribute" match="ref">
														<children>
															<combobox xpath="../../../hpb:systemList/hpb:system/@id">
																<styles width="1.46in"/>
																<children>
																	<content subtype="regular"/>
																</children>
															</combobox>
														</children>
														<variables/>
													</template>
													<newline/>
													<newline/>
													<template subtype="attribute" match="ref">
														<children>
															<content subtype="regular"/>
														</children>
														<variables/>
													</template>
													<newline/>
													<newline/>
												</children>
												<variables/>
											</template>
										</children>
										<variables/>
									</template>
									<newline/>
									<newline/>
									<newline/>
									<newline/>
								</children>
								<variables/>
							</template>
							<newline/>
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
