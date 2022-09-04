@Echo off & Setlocal EnableDelayedExpansion
rem preparation command
set pwshcmd=powershell -NoP -C "[System.Reflection.Assembly]::LoadWithPartialName('System.windows.forms')|Out-Null;$OFD = New-Object System.Windows.Forms.OpenFileDialog;$OFD.Multiselect = $True;$OFD.Filter = 'BF (*.BF)| *.BF';$OFD.InitialDirectory = [Environment]::GetFolderPath('Desktop');$OFD.ShowDialog()|out-null;$OFD.FileNames"

Set i=0
for /f "delims=" %%I in ('%pwshcmd%') do (
    Set /A i+=1
    set "FileName[!i!]=%%I"
PersonaEditorCMD.exe "%%I" -expptp /sub /co2n
)