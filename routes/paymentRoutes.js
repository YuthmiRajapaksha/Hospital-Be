// GET patient count for a specific doctor
router.get("/api/doctors/:id/patient-count", async (req, res) => {
  const doctorId = req.params.id;

  try {
    const [result] = await pool.query(
      "SELECT COUNT(*) AS patientCount FROM appointments WHERE doctor_id = ?",
      [doctorId]
    );

    res.json({ patientCount: result[0].patientCount });
  } catch (error) {
    console.error("Error fetching patient count:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});



module.exports = router;