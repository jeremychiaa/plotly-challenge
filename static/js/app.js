// Using d3 to read into data
d3.json("samples.json").then((sampleData) => {
    console.log(sampleData);

    // Store each patient ID into an array
    var names = sampleData.names;

    // Using d3 to populate dropdown options with patient IDs
    d3.select("#selDataset").selectAll("option")
        .data(names)
        .enter()
        .append("option")
        .html(d => d);

    // Define init function that loads visualisations when page is initialised
    function init(i) {
        
        // Set index value to 0 for every page load
        i = i || 0;

        // Store data from each sample into an object
        var patientData = sampleData.samples;

        // Sort new object by sample values
        var sortedPatientData = patientData.sort((a, b) => b.sample_values - a.sample_values);
    }

});