<?xml version="1.0" encoding="UTF-8"?>
<structure version="16" html-doctype="HTML4 Transitional" compatibility-view="IE7" relativeto="*SPS" encodinghtml="UTF-8" encodingrtf="ISO-8859-1" encodingpdf="UTF-8" useimportschema="1" embed-images="1" enable-authentic-scripts="1" authentic-scripts-in-debug-mode-external="0" generated-file-location="DEFAULT">
	<parameters/>
	<schemasources>
		<namespaces>
			<nspair prefix="n1" uri="http://www.learnhpb.org/schemas/hpb"/>
		</namespaces>
		<schemasources>
			<xsdschemasource name="XML" main="1" schemafile="Building.xsd" workingxmlfile="Building.xml"/>
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
							<newline/>
							<paragraph paragraphtag="h1">
								<children>
									<text fixtext="Variables"/>
								</children>
							</paragraph>
							<template subtype="element" match="n1:SystemList">
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
											<template subtype="element" match="n1:SubSystem">
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
															<calltemplate subtype="named" match="VariableBlock">
																<parameters/>
															</calltemplate>
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
			<globaltemplate subtype="named" match="VariableBlock">
				<parameters/>
				<children>
					<paragraph>
						<properties class="variable"/>
						<children>
							<template subtype="element" match="n1:Variable">
								<children>
									<paragraph>
										<properties class="variable-inner"/>
										<children>
											<paragraph>
												<properties class="code-name-all"/>
												<children>
													<calltemplate subtype="named" match="CodeName">
														<parameters/>
													</calltemplate>
												</children>
											</paragraph>
											<template subtype="attribute" match="name">
												<children>
													<content subtype="regular"/>
													<text fixtext=":"/>
												</children>
												<variables/>
											</template>
											<text fixtext=" "/>
											<template subtype="element" match="n1:OptionList">
												<children>
													<combobox xpath="n1:Option/@name">
														<styles width="1.67in"/>
														<children>
															<content subtype="regular"/>
														</children>
													</combobox>
													<template subtype="element" match="n1:Option">
														<children>
															<template subtype="element" match="n1:Variable">
																<children>
																	<template subtype="attribute" match="name">
																		<children>
																			<content subtype="regular"/>
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
											<template subtype="element" match="n1:Integer">
												<children>
													<template subtype="attribute" match="default">
														<children>
															<editfield>
																<styles width="0.38in"/>
																<children>
																	<content subtype="regular">
																		<format basic-type="xsd" datatype="decimal"/>
																	</content>
																</children>
															</editfield>
														</children>
														<variables/>
													</template>
													<text fixtext=" ("/>
													<template subtype="attribute" match="min">
														<children>
															<content subtype="regular">
																<format basic-type="xsd" datatype="decimal"/>
															</content>
														</children>
														<variables/>
													</template>
													<text fixtext="-"/>
													<template subtype="attribute" match="max">
														<children>
															<content subtype="regular">
																<format basic-type="xsd" datatype="decimal"/>
															</content>
														</children>
														<variables/>
													</template>
													<text fixtext=")"/>
												</children>
												<variables/>
											</template>
											<template subtype="element" match="n1:Decimal">
												<children>
													<text fixtext=" "/>
													<template subtype="attribute" match="default">
														<children>
															<editfield>
																<styles width="0.38in"/>
																<children>
																	<content subtype="regular">
																		<format basic-type="xsd" datatype="decimal"/>
																	</content>
																</children>
															</editfield>
														</children>
														<variables/>
													</template>
													<text fixtext=" ("/>
													<template subtype="attribute" match="min">
														<children>
															<content subtype="regular">
																<format basic-type="xsd" datatype="decimal"/>
															</content>
														</children>
														<variables/>
													</template>
													<text fixtext="-"/>
													<template subtype="attribute" match="max">
														<children>
															<content subtype="regular">
																<format basic-type="xsd" datatype="decimal"/>
															</content>
														</children>
														<variables/>
													</template>
													<text fixtext=")"/>
												</children>
												<variables/>
											</template>
										</children>
									</paragraph>
								</children>
								<variables/>
							</template>
						</children>
					</paragraph>
				</children>
			</globaltemplate>
			<globaltemplate subtype="named" match="CodeName">
				<parameters/>
				<children>
					<template subtype="userdefined" match="..">
						<children>
							<template subtype="userdefined" match="..">
								<children>
									<template subtype="attribute" match="abbr">
										<children>
											<content subtype="regular">
												<properties class="code-name-level-1"/>
											</content>
										</children>
										<variables/>
									</template>
								</children>
								<variables/>
							</template>
						</children>
						<variables/>
					</template>
					<template subtype="userdefined" match="..">
						<children>
							<template subtype="attribute" match="abbr">
								<children>
									<content subtype="regular">
										<properties class="code-name-level-2"/>
									</content>
								</children>
								<variables/>
							</template>
						</children>
						<variables/>
					</template>
					<template subtype="attribute" match="abbr">
						<children>
							<content subtype="regular"/>
						</children>
						<variables/>
					</template>
				</children>
			</globaltemplate>
		</children>
	</designfragments>
	<xmltables/>
	<authentic-custom-toolbar-buttons/>
</structure>
