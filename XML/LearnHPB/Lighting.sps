<?xml version="1.0" encoding="UTF-8"?>
<structure version="16" html-doctype="HTML4 Transitional" compatibility-view="IE7" relativeto="*SPS" encodinghtml="UTF-8" encodingrtf="ISO-8859-1" encodingpdf="UTF-8" useimportschema="1" embed-images="1" enable-authentic-scripts="1" authentic-scripts-in-debug-mode-external="0" generated-file-location="DEFAULT">
	<parameters/>
	<schemasources>
		<namespaces>
			<nspair prefix="n1" uri="http://www.learnhpb.org/schemas/hpb"/>
		</namespaces>
		<schemasources>
			<xsdschemasource name="XML" main="1" schemafile="Lighting.xsd" workingxmlfile="Lighting.xml"/>
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
					<template subtype="source" match="XML">
						<children>
							<paragraph paragraphtag="h2">
								<children>
									<text fixtext="Building System List"/>
								</children>
							</paragraph>
							<template subtype="element" match="n1:Building">
								<children>
									<newline/>
									<template subtype="element" match="n1:System">
										<children>
											<paragraph>
												<children>
													<newline/>
													<paragraph>
														<properties class="level1"/>
														<children>
															<template subtype="attribute" match="name">
																<children>
																	<content subtype="regular"/>
																</children>
																<variables/>
															</template>
															<text fixtext=" ("/>
															<template subtype="attribute" match="abbr">
																<children>
																	<content subtype="regular"/>
																</children>
																<variables/>
															</template>
															<text fixtext=")"/>
														</children>
													</paragraph>
													<template subtype="element" match="n1:Category">
														<children>
															<paragraph>
																<properties class="level2"/>
																<children>
																	<template subtype="attribute" match="name">
																		<children>
																			<content subtype="regular"/>
																		</children>
																		<variables/>
																	</template>
																</children>
															</paragraph>
															<paragraph>
																<properties class="level3"/>
																<children>
																	<tgrid>
																		<properties border="1" class="tableheader"/>
																		<children>
																			<tgridbody-cols>
																				<children>
																					<tgridcol>
																						<properties class="col1"/>
																					</tgridcol>
																					<tgridcol>
																						<properties class="col2"/>
																					</tgridcol>
																					<tgridcol>
																						<properties class="col3"/>
																					</tgridcol>
																					<tgridcol>
																						<properties class="col3"/>
																					</tgridcol>
																					<tgridcol>
																						<properties class="col4"/>
																					</tgridcol>
																					<tgridcol>
																						<properties class="col5"/>
																					</tgridcol>
																					<tgridcol>
																						<properties class="col6"/>
																					</tgridcol>
																					<tgridcol>
																						<properties class="col7"/>
																					</tgridcol>
																					<tgridcol>
																						<properties class="col8"/>
																					</tgridcol>
																					<tgridcol>
																						<properties class="col9"/>
																					</tgridcol>
																				</children>
																			</tgridbody-cols>
																			<tgridheader-rows>
																				<children>
																					<tgridrow>
																						<children>
																							<tgridcell>
																								<children>
																									<text fixtext="ph"/>
																								</children>
																							</tgridcell>
																							<tgridcell>
																								<children>
																									<text fixtext="Name"/>
																								</children>
																							</tgridcell>
																							<tgridcell>
																								<children>
																									<text fixtext="scope"/>
																								</children>
																							</tgridcell>
																							<tgridcell>
																								<children>
																									<text fixtext="abbr"/>
																								</children>
																							</tgridcell>
																							<tgridcell>
																								<children>
																									<text fixtext="option 1"/>
																								</children>
																							</tgridcell>
																							<tgridcell>
																								<children>
																									<text fixtext="option 2"/>
																								</children>
																							</tgridcell>
																							<tgridcell>
																								<children>
																									<text fixtext="option 3"/>
																								</children>
																							</tgridcell>
																							<tgridcell>
																								<children>
																									<text fixtext="option 4"/>
																								</children>
																							</tgridcell>
																							<tgridcell>
																								<children>
																									<text fixtext="Decimal"/>
																								</children>
																							</tgridcell>
																							<tgridcell>
																								<children>
																									<text fixtext="description"/>
																								</children>
																							</tgridcell>
																						</children>
																					</tgridrow>
																				</children>
																			</tgridheader-rows>
																			<tgridbody-rows>
																				<children>
																					<template subtype="element" match="n1:Variable">
																						<children>
																							<tgridrow>
																								<children>
																									<tgridcell>
																										<children>
																											<template subtype="attribute" match="phase">
																												<children>
																													<content subtype="regular"/>
																												</children>
																												<variables/>
																											</template>
																										</children>
																									</tgridcell>
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
																											<template subtype="attribute" match="scope">
																												<children>
																													<content subtype="regular"/>
																												</children>
																												<variables/>
																											</template>
																										</children>
																									</tgridcell>
																									<tgridcell>
																										<children>
																											<template subtype="attribute" match="abbr">
																												<children>
																													<content subtype="regular"/>
																												</children>
																												<variables/>
																											</template>
																										</children>
																									</tgridcell>
																									<tgridcell>
																										<children>
																											<template subtype="element" match="n1:Enum">
																												<children>
																													<autocalc xpath="n1:Option[2]"/>
																												</children>
																												<variables/>
																											</template>
																										</children>
																									</tgridcell>
																									<tgridcell>
																										<children>
																											<template subtype="element" match="n1:Enum">
																												<children>
																													<autocalc xpath="n1:Option[3]"/>
																												</children>
																												<variables/>
																											</template>
																										</children>
																									</tgridcell>
																									<tgridcell>
																										<children>
																											<template subtype="element" match="n1:Enum">
																												<children>
																													<autocalc xpath="n1:Option[3]"/>
																												</children>
																												<variables/>
																											</template>
																										</children>
																									</tgridcell>
																									<tgridcell>
																										<children>
																											<template subtype="element" match="n1:Enum">
																												<children>
																													<autocalc xpath="n1:Option[4]"/>
																												</children>
																												<variables/>
																											</template>
																										</children>
																									</tgridcell>
																									<tgridcell>
																										<children>
																											<template subtype="element" match="n1:Decimal">
																												<children>
																													<content subtype="regular"/>
																												</children>
																												<variables/>
																											</template>
																										</children>
																									</tgridcell>
																									<tgridcell>
																										<children>
																											<template subtype="element" match="n1:description">
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
															</paragraph>
														</children>
														<variables/>
													</template>
												</children>
											</paragraph>
										</children>
										<variables/>
									</template>
								</children>
								<variables/>
							</template>
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
