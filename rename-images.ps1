# Quick Image Rename Script for CyberSuite
# This script renames screenshots to meaningful names for the README

$imagesPath = "docs\images"

# Define the mapping based on your descriptions
$renameMap = @(
    @{Old="Screenshot 2025-12-14 101019.png"; New="password-manager-light.png"}
    @{Old="Screenshot 2025-12-14 121547.png"; New="2fa-scanner-view.png"}
    @{Old="Screenshot 2025-12-14 121853.png"; New="2fa-settings-option.png"}
    @{Old="Screenshot 2025-12-14 121945.png"; New="dashboard-light.png"}
    @{Old="Screenshot 2025-12-14 122151.png"; New="file-vault-light.png"}
    @{Old="Screenshot 2025-12-14 122518.png"; New="network-scanner-console-dark.png"}
    @{Old="Screenshot 2025-12-14 122645.png"; New="add-credential-modal-light.png"}
    @{Old="Screenshot 2025-12-14 122718.png"; New="add-credential-modal-dark.png"}
    @{Old="Screenshot 2025-12-14 122758.png"; New="password-generator-ml-dark.png"}
    @{Old="Screenshot 2025-12-14 122835.png"; New="password-manager-dark.png"}
    @{Old="Screenshot 2025-12-14 122936.png"; New="network-scanner-dark.png"}
    @{Old="Screenshot 2025-12-14 123058.png"; New="dashboard-dark.png"}
    @{Old="Screenshot 2025-12-14 123354.png"; New="courses-list-dark.png"}
    @{Old="Screenshot 2025-12-14 123616.png"; New="education-dashboard-dark.png"}
    @{Old="Screenshot 2025-12-14 123710.png"; New="profile-settings-light.png"}
    @{Old="Screenshot 2025-12-14 123819.png"; New="profile-settings-dark.png"}
    @{Old="Screenshot 2025-12-14 125140.png"; New="mongodb-database.png"}
    @{Old="Screenshot 2025-12-14 173151.png"; New="education-dashboard-light.png"}
    @{Old="Screenshot 2025-12-14 173224.png"; New="course-lesson-light.png"}
)

Write-Host "Renaming images for CyberSuite README..." -ForegroundColor Cyan
Write-Host ""

foreach ($item in $renameMap) {
    $oldPath = Join-Path $imagesPath $item.Old
    $newPath = Join-Path $imagesPath $item.New
    
    if (Test-Path $oldPath) {
        Rename-Item -Path $oldPath -NewName $item.New -Force
        Write-Host "Renamed: $($item.Old) -> $($item.New)" -ForegroundColor Green
    } else {
        Write-Host "Not found: $($item.Old)" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "Image renaming complete!" -ForegroundColor Green
Write-Host "Images are in: $imagesPath" -ForegroundColor Cyan
