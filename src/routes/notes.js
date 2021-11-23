const router = require("express").Router();

const Notes = require("../models/Notes");

router.get("/notes/add", (req, res) => {
  res.render("notes/new_note");
});
router.post("/notes/new_note", async(req, res) => {
  const { title, description } = req.body;
  const error = [];
  if (!title || !description) {
    error.push({ text: "Please Write title or description" });
  }
  if (error.length > 0) {
    res.render("notes/new_note", {
      error,
      title,
      description,
    });
  } else {
    const newNote  = new Notes({title, description});
    await newNote.save();
    res.redirect("/notes");
  }
});
router.get("/notes", async(req, res) => {
  const notes = await Notes.find().sort({date: 'desc'});
  res.render('notes/all_notes', {notes})
});
router.get("/notes/edit/:_id", async(req, res)=>{
    const note = await Notes.findById(req.params._id);
    res.render('notes/edit_note', {note});
});

router.put('/notes/edit_note/:_id', async(req, res)=>{
    const {title, description} =req.body;
    await Notes.findByIdAndUpdate(req.params._id, {title, description})
    res.redirect('/notes');
});

router.delete('/notes/delete/:_id', async(req,res)=>{
  await Notes.findByIdAndDelete(req.params._id);
  res.redirect('/notes');
});
module.exports = router;
