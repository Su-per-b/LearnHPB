<?xml version="1.0" encoding="UTF-8"?>
<structure version="16" html-doctype="HTML4 Transitional" compatibility-view="IE7" relativeto="*SPS" encodinghtml="UTF-8" encodingrtf="ISO-8859-1" encodingpdf="UTF-8" useimportschema="1" embed-images="1" enable-authentic-scripts="1" authentic-scripts-in-debug-mode-external="0" generated-file-location="DEFAULT">
	<parameters/>
	<schemasources>
		<namespaces>
			<nspair prefix="n1" uri="http://www.learnhpb.org/schemas/hpb"/>
		</namespaces>
		<schemasources>
			<xsdschemasource name="XML" main="1" schemafile="Systems.xsd" workingxmlfile="Systems.xml"/>
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
		<Project version="2" app="AuthenticView">
			<Macros>
				<Macro name="selected"/>
			</Macros>
		</Project>
	</script-project>
	<importedxslt/>
	<globalstyles>
		<rule url="styles.css">
			<media>
				<media value="all"/>
			</media>
		</rule>
	</globalstyles>
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
					<newline/>
					<newline/>
					<newline/>
					<template subtype="source" match="XML">
						<children>
							<newline/>
							<paragraph paragraphtag="h2">
								<children>
									<text fixtext="Make Selection"/>
								</children>
							</paragraph>
							<template subtype="element" match="n1:systems">
								<children>
									<newline/>
									<paragraph>
										<children>
											<combobox evaluation-context-schema="XML" evaluation-context="V2.0,,ffffffff,0,1,0,systems,systems," xpath="n1:system/@name" xpath-values="n1:system/@pfx" values-from-xpath="1">
												<properties id="selection1"/>
												<styles width="1.46in"/>
												<children>
													<content subtype="regular"/>
												</children>
											</combobox>
										</children>
									</paragraph>
									<newline/>
									<tgrid>
										<properties cellpadding="5" cellspacing="0" class="toptable" width="300"/>
										<children>
											<tgridbody-cols>
												<children>
													<tgridcol>
														<properties align="left" width="80%"/>
													</tgridcol>
													<tgridcol>
														<properties align="center" width="20%"/>
													</tgridcol>
												</children>
											</tgridbody-cols>
											<tgridbody-rows>
												<children>
													<tgridrow>
														<children>
															<tgridcell>
																<children>
																	<text fixtext="Name"/>
																</children>
															</tgridcell>
															<tgridcell>
																<children>
																	<text fixtext="abbr"/>
																</children>
															</tgridcell>
														</children>
													</tgridrow>
												</children>
											</tgridbody-rows>
										</children>
									</tgrid>
									<newline/>
									<template subtype="element" match="n1:system">
										<children>
											<newline/>
											<tgrid>
												<properties cellpadding="5" cellspacing="0" width="300"/>
												<children>
													<tgridbody-cols>
														<children>
															<tgridcol>
																<properties align="left" width="80%"/>
															</tgridcol>
															<tgridcol>
																<properties align="center" width="20%"/>
															</tgridcol>
														</children>
													</tgridbody-cols>
													<tgridheader-rows>
														<children>
															<tgridrow>
																<children>
																	<tgridcell>
																		<children>
																			<template subtype="attribute" match="name">
																				<children>
																					<content subtype="regular"/>
																				</children>
																				<variables/>
																			</template>
																		</children>
																	</tgridcell>
																	<tgridcell>
																		<children>
																			<template subtype="attribute" match="pfx">
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
													</tgridheader-rows>
													<tgridbody-rows>
														<children>
															<template subtype="element" match="n1:system">
																<children>
																	<tgridrow>
																		<children>
																			<tgridcell>
																				<children>
																					<template subtype="attribute" match="name">
																						<children>
																							<content subtype="regular"/>
																						</children>
																						<variables/>
																					</template>
																				</children>
																			</tgridcell>
																			<tgridcell>
																				<children>
																					<template subtype="attribute" match="pfx">
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
																<variables/>
															</template>
														</children>
													</tgridbody-rows>
												</children>
											</tgrid>
										</children>
										<variables/>
									</template>
									<newline/>
									<newline/>
									<newline/>
								</children>
								<variables/>
							</template>
							<newline/>
							<newline/>
							<newline/>
						</children>
						<variables/>
					</template>
					<newline/>
					<newline/>
					<newline/>
				</children>
			</globaltemplate>
		</children>
	</mainparts>
	<globalparts/>
	<designfragments/>
	<xmltables/>
	<authentic-custom-toolbar-buttons/>
</structure>
