
Carry out the following steps:


1. Ensure that LaTeX2e, biblatex, and biber are installed on your system
   and pdflatex and biber are in your path.

   For Windows, I use cygwin and TexLive 2018 (ISO image):

     http://mirror.ctan.org/systems/texlive/Images/

   The ISO image contains versions for Windows, Mac, and Linux.
   Under Windows 10, an ISO image can be mounted by double-clicking.



2. Upgrade to the most recent versions of biblatex and biber.
   I use biblatex 3.12 with biber 2.12.

   With TexLive you can use the TexLive Manager GUI to update
   packages online from a nearby CTAN mirror.

   [The default CTAN mirror for Austria is hosted by easyname.at.
    I usually load an alternative repository from Germany, such
    as the one at
    http://vesta.informatik.rwth-aachen.de/ftp/pub/mirror/ctan/system
   ]



3. Set the following environment variables:

   setenv TEXINPUTS .:~/tex/inputs:./inputs::
   setenv BSTINPUTS .:~/tex/inputs::
   setenv BIBINPUTS .:~/tex/bib:./bib::




4. Use a plain text editor and the command line.

  Do not use LaTeX editors such as TeXworks, TeXmaker, or
  TeXstudio. They obscure what is really happening when you compile.

  Do not use online LaTeX environments such as Overleaf or ShareLaTeX,
  or install using apt-get under Linux, since neither of these
  typically use/install the most recent versions of LaTeX packages and
  may be incompatible with the example LaTeX skeleton.
  




5. Compile the PDF with the following sequence of commands

   pdflatex survey
   biber survey
   pdflatex survey
   pdflatex survey
   pdflatex survey


  Running pdflatex (or biber) often creates intermediate files which
  are used as input for the next run. Basically, if pdflatex prints a
  message to the terminal saying something like:

    LaTeX Warning: Label(s) may have changed. Rerun to get
      cross-references right.

  or:

    Package biblatex Warning: Please rerun LaTeX.
    (biblatex)                Page breaks have changed.

  then you need to run pdflatex again.


  Alternatively, you can use the latexmk perl script:

   latexmk --pdf survey

