<?xml version="1.0" encoding="UTF-8"?>
<structure version="16" html-doctype="HTML4 Transitional" compatibility-view="IE7" relativeto="*SPS" encodinghtml="UTF-8" encodingrtf="ISO-8859-1" encodingpdf="UTF-8" useimportschema="1" embed-images="1" enable-authentic-scripts="1" authentic-scripts-in-debug-mode-external="0" generated-file-location="DEFAULT">
	<parameters/>
	<schemasources>
		<namespaces>
			<nspair prefix="hpb" uri="http://www.learnhpb.org/schemas/learn-hpb"/>
		</namespaces>
		<schemasources>
			<xsdschemasource name="XML" main="1" schemafile="learnHPB.xsd" workingxmlfile="LearnHPB.xml"/>
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
									<template subtype="element" match="hpb:Title">
										<children>
											<content subtype="regular">
												<styles font-family="arial" font-weight="700"/>
											</content>
										</children>
										<variables/>
									</template>
									<newline/>
									<template subtype="element" match="hpb:component-1">
										<children>
											<newline/>
											<tgrid>
												<properties border="1" width="100%"/>
												<children>
													<tgridbody-cols>
														<children>
															<tgridcol/>
															<tgridcol/>
														</children>
													</tgridbody-cols>
													<tgridbody-rows>
														<children>
															<tgridrow>
																<styles height="0.28in"/>
																<children>
																	<tgridcell>
																		<children>
																			<text fixtext="name"/>
																		</children>
																	</tgridcell>
																	<tgridcell>
																		<children>
																			<template subtype="element" match="hpb:component-name">
																				<children>
																					<content subtype="regular"/>
																				</children>
																				<variables/>
																			</template>
																		</children>
																	</tgridcell>
																</children>
															</tgridrow>
															<tgridrow>
																<children>
																	<tgridcell>
																		<children>
																			<text fixtext="type"/>
																		</children>
																	</tgridcell>
																	<tgridcell>
																		<children>
																			<template subtype="element" match="hpb:component-type">
																				<children>
																					<content subtype="regular"/>
																				</children>
																				<variables/>
																			</template>
																		</children>
																	</tgridcell>
																</children>
															</tgridrow>
														</children>
													</tgridbody-rows>
												</children>
											</tgrid>
										</children>
										<variables/>
									</template>
									<newline/>
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
				</children>
			</globaltemplate>
		</children>
	</mainparts>
	<globalparts/>
	<designfragments/>
	<xmltables/>
	<authentic-custom-toolbar-buttons/>
</structure>
