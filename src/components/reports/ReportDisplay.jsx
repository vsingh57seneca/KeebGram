import React, { useEffect, useState } from "react";
import Reports from "@/functions/Reports";
import Posts from "@/functions/Posts";
import Comments from "@/functions/Comments";

const ReportDisplay = ({
  showModal,
  setShowModal,
  onClose,
  id,
  type,
}) => {
    const [reports, setReports] = useState([]);
    const [selectedReport, setSelectedReport] = useState(null);

    const fetchReports = async () => {
        try {
            const reports = await Reports.getAll();
            setReports(reports);
        } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async () => {
    try {
        if (type === "post") {
            await Posts.setReported(id, selectedReport);
        } else if (type === "comment") {
            await Comments.setReported(id, selectedReport);
        }

        setShowModal(false);
    } catch (error) {
        console.error(error);
    }
  }

  useEffect(() => {
    fetchReports();
  }, []);

  const handleReportChange = (e) => {
    setSelectedReport(Number(e.target.value));
    console.log(e.target.value);
  };

  return (
    <>
      {showModal && (
        <>
          <div className="absolute top-0 left-0 flex w-full min-h-screen bg-black/70 z-50">
            <div className="flex md:items-center md:justify-center w-full">
              <div className="bg-white h-fit p-8 rounded w-full md:w-1/4 flex flex-col gap-y-2">
                <label className="font-semibold mb-4">Report</label>
                {reports.map((report) => (
                  <label key={report.report_id} className="flex items-center gap-x-2">
                    <input
                      type="radio"
                      name="report"
                      value={report.report_id}
                      checked={selectedReport === report.report_id}
                      onChange={handleReportChange}
                      className="radio radio-primary"
                    />
                    {report.description}
                  </label>
                ))}
                <div className="flex justify-between items-end">
                 <button
                    className="btn btn-sm btn-success text-white"
                    onClick={onSubmit}
                  >
                    Submit Report
                  </button>
                  <button
                    className="btn btn-sm btn-error text-white"
                    onClick={onClose}
                  >
                    Close
                  </button>
                  </div>
                </div>
              </div>
            </div>
        </>
      )}
    </>
  );
};

export default ReportDisplay;
