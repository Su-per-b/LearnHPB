<?xml version="1.0" encoding="UTF-8"?>
<structure version="16" html-doctype="HTML4 Transitional" compatibility-view="IE7" relativeto="*SPS" encodinghtml="UTF-8" encodingrtf="ISO-8859-1" encodingpdf="UTF-8" useimportschema="1" embed-images="1" enable-authentic-scripts="1" authentic-scripts-in-debug-mode-external="0" generated-file-location="DEFAULT">
	<parameters/>
	<schemasources>
		<namespaces>
			<nspair prefix="n1" uri="http://www.learnhpb.org/schemas/hpb"/>
		</namespaces>
		<schemasources>
			<xsdschemasource name="XML" main="1" schemafile="Lighting3.xsd" workingxmlfile="Lighting3.xml"/>
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
					<newline/>
					<template subtype="source" match="XML">
						<children>
							<newline/>
							<paragraph paragraphtag="h1">
								<children>
									<text fixtext="Variables"/>
								</children>
							</paragraph>
							<template subtype="element" match="n1:Building">
								<children>
									<template subtype="element" match="n1:System">
										<children>
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
													<template subtype="element" match="n1:Variable">
														<children>
															<calltemplate subtype="named" match="Variable">
																<parameters/>
															</calltemplate>
														</children>
														<variables/>
													</template>
													<template subtype="element" match="n1:Category">
														<children>
															<paragraph>
																<properties class="level3"/>
																<children>
																	<template subtype="attribute" match="name">
																		<children>
																			<content subtype="regular"/>
																		</children>
																		<variables/>
																	</template>
																	<text fixtext="("/>
																	<template subtype="attribute" match="abbr">
																		<children>
																			<content subtype="regular"/>
																		</children>
																		<variables/>
																	</template>
																	<text fixtext=")"/>
																</children>
															</paragraph>
															<template subtype="element" match="n1:Variable">
																<children>
																	<calltemplate subtype="named" match="Variable">
																		<parameters/>
																	</calltemplate>
																</children>
																<variables/>
															</template>
															<newline/>
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
	<designfragments>
		<children>
			<globaltemplate subtype="named" match="Variable">
				<parameters/>
				<children>
					<paragraph>
						<properties class="variable"/>
						<children>
							<paragraph paragraphtag="h4">
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
							<tgrid>
								<properties border="1"/>
								<children>
									<tgridheader-cols>
										<children>
											<tgridcol/>
										</children>
									</tgridheader-cols>
									<tgridbody-cols>
										<children>
											<tgridcol/>
										</children>
									</tgridbody-cols>
									<tgridbody-rows>
										<children>
											<tgridrow>
												<children>
													<tgridcell>
														<children>
															<text fixtext="phase"/>
														</children>
													</tgridcell>
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
												</children>
											</tgridrow>
											<tgridrow>
												<children>
													<tgridcell>
														<children>
															<text fixtext="scope"/>
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
												</children>
											</tgridrow>
											<tgridrow>
												<children>
													<tgridcell>
														<children>
															<text fixtext="variability"/>
														</children>
													</tgridcell>
													<tgridcell>
														<children>
															<template subtype="attribute" match="variability">
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
															<text fixtext="unit"/>
														</children>
													</tgridcell>
													<tgridcell>
														<children>
															<template subtype="attribute" match="unit">
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
							<template subtype="element" match="n1:Integer">
								<children>
									<tgrid>
										<properties border="1"/>
										<children>
											<tgridheader-cols>
												<children>
													<tgridcol/>
												</children>
											</tgridheader-cols>
											<tgridbody-cols>
												<children>
													<tgridcol/>
												</children>
											</tgridbody-cols>
											<tgridbody-rows>
												<children>
													<tgridrow>
														<children>
															<tgridcell>
																<children>
																	<text fixtext="type"/>
																</children>
															</tgridcell>
															<tgridcell>
																<children>
																	<text fixtext="Integer"/>
																</children>
															</tgridcell>
														</children>
													</tgridrow>
													<tgridrow>
														<children>
															<tgridcell>
																<children>
																	<text fixtext="min"/>
																</children>
															</tgridcell>
															<tgridcell>
																<children>
																	<template subtype="attribute" match="min">
																		<children>
																			<content subtype="regular">
																				<format basic-type="xsd" datatype="decimal"/>
																			</content>
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
																	<text fixtext="max"/>
																</children>
															</tgridcell>
															<tgridcell>
																<children>
																	<template subtype="attribute" match="max">
																		<children>
																			<content subtype="regular">
																				<format basic-type="xsd" datatype="decimal"/>
																			</content>
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
																	<text fixtext="default"/>
																</children>
															</tgridcell>
															<tgridcell>
																<children>
																	<template subtype="attribute" match="default">
																		<children>
																			<content subtype="regular">
																				<format basic-type="xsd" datatype="decimal"/>
																			</content>
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
							<template subtype="element" match="n1:Decimal">
								<children>
									<tgrid>
										<properties border="1"/>
										<children>
											<tgridheader-cols>
												<children>
													<tgridcol/>
												</children>
											</tgridheader-cols>
											<tgridbody-cols>
												<children>
													<tgridcol/>
												</children>
											</tgridbody-cols>
											<tgridbody-rows>
												<children>
													<tgridrow>
														<children>
															<tgridcell>
																<children>
																	<text fixtext="type"/>
																</children>
															</tgridcell>
															<tgridcell>
																<children>
																	<text fixtext="Decimal"/>
																</children>
															</tgridcell>
														</children>
													</tgridrow>
													<tgridrow>
														<children>
															<tgridcell>
																<children>
																	<text fixtext="min"/>
																</children>
															</tgridcell>
															<tgridcell>
																<children>
																	<template subtype="attribute" match="min">
																		<children>
																			<content subtype="regular">
																				<format basic-type="xsd" datatype="decimal"/>
																			</content>
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
																	<text fixtext="max"/>
																</children>
															</tgridcell>
															<tgridcell>
																<children>
																	<template subtype="attribute" match="max">
																		<children>
																			<content subtype="regular">
																				<format basic-type="xsd" datatype="decimal"/>
																			</content>
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
																	<text fixtext="default"/>
																</children>
															</tgridcell>
															<tgridcell>
																<children>
																	<template subtype="attribute" match="default">
																		<children>
																			<content subtype="regular">
																				<format basic-type="xsd" datatype="decimal"/>
																			</content>
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
							<template subtype="element" match="n1:OptionList">
								<children>
									<paragraph>
										<properties class="optionlist"/>
										<children>
											<tgrid>
												<properties border="1"/>
												<children>
													<tgridheader-cols>
														<children>
															<tgridcol/>
														</children>
													</tgridheader-cols>
													<tgridbody-cols>
														<children>
															<tgridcol/>
														</children>
													</tgridbody-cols>
													<tgridbody-rows>
														<children>
															<tgridrow>
																<children>
																	<tgridcell>
																		<children>
																			<text fixtext="type"/>
																		</children>
																	</tgridcell>
																	<tgridcell>
																		<children>
																			<text fixtext="OptionList"/>
																		</children>
																	</tgridcell>
																</children>
															</tgridrow>
														</children>
													</tgridbody-rows>
												</children>
											</tgrid>
										</children>
									</paragraph>
									<paragraph>
										<properties class="optionlist"/>
										<children>
											<tgrid>
												<properties border="1"/>
												<children>
													<tgridbody-cols>
														<children>
															<tgridcol/>
															<tgridcol/>
															<tgridcol/>
															<tgridcol/>
														</children>
													</tgridbody-cols>
													<tgridheader-rows>
														<children>
															<tgridrow>
																<children>
																	<tgridcell>
																		<children>
																			<text fixtext="option name"/>
																		</children>
																	</tgridcell>
																	<tgridcell>
																		<children>
																			<text fixtext="default"/>
																		</children>
																	</tgridcell>
																	<tgridcell>
																		<children>
																			<text fixtext="disabled"/>
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
															<template subtype="element" match="n1:Option">
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
																					<template subtype="attribute" match="default">
																						<children>
																							<content subtype="regular"/>
																						</children>
																						<variables/>
																					</template>
																				</children>
																			</tgridcell>
																			<tgridcell>
																				<children>
																					<template subtype="attribute" match="disabled">
																						<children>
																							<content subtype="regular"/>
																						</children>
																						<variables/>
																					</template>
																				</children>
																			</tgridcell>
																			<tgridcell>
																				<children>
																					<template subtype="attribute" match="description">
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
			</globaltemplate>
		</children>
	</designfragments>
	<xmltables/>
	<authentic-custom-toolbar-buttons/>
</structure>
