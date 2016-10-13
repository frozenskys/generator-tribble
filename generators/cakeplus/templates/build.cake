///////////////////////////////////////////////////////////////////////////////
// Tools and Addins
///////////////////////////////////////////////////////////////////////////////
#tool "GitVersion.CommandLine"
#addin nuget:?package=Cake.Git
#addin nuget:?package=Cake.Figlet

///////////////////////////////////////////////////////////////////////////////
// ARGUMENTS
///////////////////////////////////////////////////////////////////////////////

var target = Argument("target", "Default");
var configuration = Argument("configuration", "Release");
var versionType = Argument("VersionType", "Patch");
var artifacts = MakeAbsolute(Directory(Argument("artifactPath", "./artifacts")));

GitVersion versionInfo = null;

///////////////////////////////////////////////////////////////////////////////
// SETUP / TEARDOWN
///////////////////////////////////////////////////////////////////////////////

Setup(ctx =>
{
	// Executed BEFORE the first task.
	Information(Figlet("Bennetts Cake"));
});

Teardown(ctx =>
{
	// Executed AFTER the last task.
	Information("Finished running tasks.");
});

///////////////////////////////////////////////////////////////////////////////
// SYSTEM TASKS
///////////////////////////////////////////////////////////////////////////////

Task("Version")
	.Does(() =>
	{
		var semVersion = "";
		int major = 0;
		int minor = 0;
		int patch = 1;
		GitVersion assertedVersions = GitVersion(new GitVersionSettings
		{
			OutputType = GitVersionOutput.Json,
		});
		major = assertedVersions.Major;
		minor = assertedVersions.Minor;
		patch = assertedVersions.Patch;
		switch (versionType)
		{
			case "patch":
				patch += 1; break;
			case "minor":
				minor += 1; break;
			case "major":
				major += 1;	break;			
		};
		semVersion = string.Format("{0}.{1}.{2}", major, minor, patch);
		GitTag(".", semVersion);
		Information("Changing version: {0} to {1}", assertedVersions.LegacySemVerPadded, semVersion);
	});

///////////////////////////////////////////////////////////////////////////////
// USER TASKS
// PUT ALL YOUR BUILD GOODNESS IN HERE
///////////////////////////////////////////////////////////////////////////////

Task("Clean")
    .Does(() =>
	{
		CleanDirectory(artifacts);
	});

Task("Default")
    .IsDependentOn("Clean")
    .Does(() => 
	{
		Information("Hello Cake!");
	});

Task("Build")
	.Does(() =>
	{
		Information("Running Build...");
		// Add your build tasks here
		// this task can depend on others :)
	});

Task("Test")
	.Does(() =>
	{
		Information("Running Tests...");
		// Add your test tasks here
		// this task can depend on others :)
	});

Task("Package")
	.Does(() =>
	{
		Information("Running Packaging...");
		// Add your packaging tasks here
		// this task can depend on others :)
	});

RunTarget(target);