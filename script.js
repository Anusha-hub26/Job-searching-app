const APP_ID = "6d400999";
const APP_KEY = "c40685338f74eb552635089c6dca334b";

async function searchJobs() {
  const keyword = document.getElementById("keyword").value;
  const location = document.getElementById("location").value;
  const jobType = document.getElementById("jobType").value;

  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "Loading...";

  try {
    const response = await fetch(
      `https://api.adzuna.com/v1/api/jobs/in/search/1?app_id=${APP_ID}&app_key=${APP_KEY}&what=${keyword}&where=${location}&full_time=${jobType === "full_time"}&part_time=${jobType === "part_time"}`
    );

    const data = await response.json();

    resultsDiv.innerHTML = "";

    if (data.results.length === 0) {
      resultsDiv.innerHTML = "No jobs found.";
      return;
    }

    data.results.forEach(job => {
      resultsDiv.innerHTML += `
        <div class="job-card">
          <h3>${job.title}</h3>
          <p><strong>Company:</strong> ${job.company.display_name}</p>
          <p><strong>Location:</strong> ${job.location.display_name}</p>
          <p>${job.description.substring(0, 120)}...</p>
          <a href="${job.redirect_url}" target="_blank">View Job</a>
        </div>
      `;
    });

  } catch (error) {
    resultsDiv.innerHTML = "Error fetching jobs.";
  }
}

