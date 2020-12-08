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

        // Find first 10 values for first patient
        var sampleValues = sortedPatientData[i].sample_values.slice(0, 10).reverse();
        var otuIds = sortedPatientData[i].otu_ids.slice(0, 10);
        var otuLabels = sortedPatientData[i].otu_labels.slice(0, 10);

        // Create empty array for chart labels
        var chartLabels = [];

        // Concatenate OTU ID to display on chart
        otuIds.forEach(x => chartLabels.push("OTU " + x));

        // Setting the data to plot
        var data = [{
            type: "bar",
            x: sampleValues,
            y: chartLabels.reverse(),
            orientation: "h",
            text: otuLabels
        }]

        // Setting the plot title
        var layout = {
            title: "Top 10 OTUs"
        }

        // Using Plotly to visualise horizontal bar chart
        Plotly.newPlot("bar", data, layout, {displayModeBar: false});
    };

    // Set up event listener
    d3.selectAll("#selDataset").on("change", optionChanged);

    // Update plot based on chosen dropdown value
    function optionChanged() {

        // Use d3 to select dropdown menu
        var dropdownMenu = d3.select("selDataset");

        // Store value into a variable
        var dropdownValue = dropdownMenu.property("value");

        console.log(names.findIndex(x => x === dropdownValue));

        // Run init function using index of valye in dropdown menu
        init(names.findIndex(x => x === dropdownValue));
    };

    // Call function to initialise page
    init();

});