// SkillGuide AJAX Integration and Site-wide JavaScript

// Global configuration
window.SkillGuide = {
  config: {
    apiBaseUrl: "/api",
    refreshInterval: 30000, // 30 seconds
    requestTimeout: 10000, // 10 seconds
    retryAttempts: 3,
  },
  cache: {},
  intervals: {},
};

// Document ready initialization
$(document).ready(function () {
  initializeGlobalComponents();
  setupGlobalEventHandlers();
  startAutoRefresh();
});

// =============================================
// Global Component Initialization
// =============================================

function initializeGlobalComponents() {
  setupAjaxDefaults();
  initializeTooltips();
  initializePopovers();
  setupFormValidation();
  setupDataTables();
  initializeNotificationSystem();
}

function setupAjaxDefaults() {
  // Global AJAX settings
  $.ajaxSetup({
    timeout: SkillGuide.config.requestTimeout,
    beforeSend: function (xhr, settings) {
      // Add CSRF token to all AJAX requests
      if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
        xhr.setRequestHeader(
          "RequestVerificationToken",
          $('input[name="__RequestVerificationToken"]').val(),
        );
      }

      // Add loading indicator for non-background requests
      if (!settings.background) {
        showGlobalLoading();
      }
    },
    complete: function (xhr, status) {
      hideGlobalLoading();
    },
    error: function (xhr, status, error) {
      handleGlobalAjaxError(xhr, status, error);
    },
  });

  // Global AJAX event handlers
  $(document)
    .ajaxStart(function () {
      $("#global-loading-indicator").show();
    })
    .ajaxStop(function () {
      $("#global-loading-indicator").hide();
    });
}

function initializeTooltips() {
  // Initialize Bootstrap tooltips
  $('[data-bs-toggle="tooltip"]').tooltip();

  // Dynamic tooltip initialization for AJAX content
  $(document).on(
    "mouseenter",
    '[title]:not([data-bs-toggle="tooltip"])',
    function () {
      $(this).attr("data-bs-toggle", "tooltip").tooltip("show");
    },
  );
}

function initializePopovers() {
  $('[data-bs-toggle="popover"]').popover();
}

function setupFormValidation() {
  // Generic form validation for AJAX forms
  $(".ajax-form").on("submit", function (e) {
    e.preventDefault();

    const form = $(this);
    const formData = new FormData(this);
    const url = form.attr("action") || window.location.href;
    const method = form.attr("method") || "POST";

    submitFormAjax(url, method, formData, form);
  });
}

function setupDataTables() {
  // Initialize DataTables with AJAX support
  $(".ajax-table").each(function () {
    const table = $(this);
    const ajaxUrl = table.data("ajax-url");

    if (ajaxUrl) {
      table.DataTable({
        ajax: {
          url: ajaxUrl,
          type: "GET",
          dataSrc: "",
        },
        processing: true,
        serverSide: false,
        responsive: true,
        pageLength: 25,
        order: [[0, "desc"]],
        language: {
          processing: '<i class="fas fa-spinner fa-spin"></i> Loading...',
        },
      });
    }
  });
}

function initializeNotificationSystem() {
  // Setup notification container if it doesn't exist
  if ($("#notification-container").length === 0) {
    $("body").append(
      '<div id="notification-container" class="position-fixed" style="top: 20px; right: 20px; z-index: 9999;"></div>',
    );
  }

  // Setup toast notifications
  $(".toast").toast();
}

// =============================================
// Global Event Handlers
// =============================================

function setupGlobalEventHandlers() {
  // Modal AJAX loading
  $(document).on("show.bs.modal", ".modal[data-ajax-url]", function () {
    const modal = $(this);
    const url = modal.data("ajax-url");
    loadModalContent(modal, url);
  });

  // Dropdown AJAX loading
  $(document).on("show.bs.dropdown", ".dropdown[data-ajax-url]", function () {
    const dropdown = $(this);
    const url = dropdown.data("ajax-url");
    loadDropdownContent(dropdown, url);
  });

  // Auto-submit forms on change
  $(document).on("change", ".auto-submit", function () {
    const form = $(this).closest("form");
    if (form.hasClass("ajax-form")) {
      form.submit();
    }
  });

  // Confirm dialogs for destructive actions
  $(document).on("click", "[data-confirm]", function (e) {
    const message = $(this).data("confirm");
    if (!confirm(message)) {
      e.preventDefault();
      return false;
    }
  });

  // Auto-refresh elements
  $(document).on("click", "[data-auto-refresh]", function () {
    const target = $(this).data("auto-refresh");
    const url = $(this).data("refresh-url");
    refreshElement(target, url);
  });
}

// =============================================
// AJAX Utility Functions
// =============================================

function submitFormAjax(url, method, formData, form) {
  $.ajax({
    url: url,
    type: method,
    data: formData,
    processData: false,
    contentType: false,
    success: function (response) {
      handleFormSuccess(response, form);
    },
    error: function (xhr, status, error) {
      handleFormError(xhr, form);
    },
  });
}

function loadModalContent(modal, url) {
  const modalBody = modal.find(".modal-body");

  modalBody.html(
    '<div class="text-center"><i class="fas fa-spinner fa-spin fa-2x"></i><p>Loading...</p></div>',
  );

  $.ajax({
    url: url,
    type: "GET",
    success: function (data) {
      modalBody.html(data);
      initializeModalContent(modal);
    },
    error: function () {
      modalBody.html(
        '<div class="alert alert-danger">Failed to load content</div>',
      );
    },
  });
}

function loadDropdownContent(dropdown, url) {
  const menu = dropdown.find(".dropdown-menu");

  if (menu.data("loaded")) return;

  $.ajax({
    url: url,
    type: "GET",
    background: true,
    success: function (data) {
      menu.html(data);
      menu.data("loaded", true);
    },
    error: function () {
      menu.html(
        '<li><span class="dropdown-item-text text-danger">Failed to load</span></li>',
      );
    },
  });
}

function refreshElement(selector, url) {
  const element = $(selector);

  if (!element.length || !url) return;

  const originalContent = element.html();
  element.html('<i class="fas fa-spinner fa-spin"></i> Refreshing...');

  $.ajax({
    url: url,
    type: "GET",
    background: true,
    success: function (data) {
      element.html(data);
      showNotification("success", "Content refreshed successfully");
    },
    error: function () {
      element.html(originalContent);
      showNotification("error", "Failed to refresh content");
    },
  });
}

// =============================================
// Data Loading Functions
// =============================================

function loadDashboardWidget(widgetId, url, refreshInterval) {
  const widget = $("#" + widgetId);
  if (!widget.length) return;

  function loadWidget() {
    $.ajax({
      url: url,
      type: "GET",
      background: true,
      success: function (data) {
        widget.html(data);
        widget.data("last-updated", new Date());
      },
      error: function () {
        widget.html(
          '<div class="alert alert-warning">Unable to load widget data</div>',
        );
      },
    });
  }

  // Initial load
  loadWidget();

  // Setup auto-refresh if specified
  if (refreshInterval) {
    SkillGuide.intervals[widgetId] = setInterval(loadWidget, refreshInterval);
  }
}

function loadSelectOptions(selectElement, url, params) {
  const select = $(selectElement);
  const currentValue = select.val();

  select.prop("disabled", true);
  select.html("<option>Loading...</option>");

  $.ajax({
    url: url,
    type: "GET",
    data: params,
    background: true,
    success: function (data) {
      let options = '<option value="">-- Select --</option>';

      if (Array.isArray(data)) {
        data.forEach(function (item) {
          const value = item.value || item.id;
          const text = item.text || item.name || item.title;
          const selected = value === currentValue ? "selected" : "";
          options += `<option value="${value}" ${selected}>${text}</option>`;
        });
      }

      select.html(options);
      select.prop("disabled", false);
    },
    error: function () {
      select.html('<option value="">Error loading options</option>');
      select.prop("disabled", false);
    },
  });
}

function loadTableData(tableId, url, params) {
  const table = $("#" + tableId);
  const tbody = table.find("tbody");

  tbody.html(
    '<tr><td colspan="100%" class="text-center"><i class="fas fa-spinner fa-spin"></i> Loading...</td></tr>',
  );

  $.ajax({
    url: url,
    type: "GET",
    data: params,
    success: function (data) {
      if (data && data.length > 0) {
        tbody.html(data);
      } else {
        tbody.html(
          '<tr><td colspan="100%" class="text-center text-muted">No data available</td></tr>',
        );
      }
    },
    error: function () {
      tbody.html(
        '<tr><td colspan="100%" class="text-center text-danger">Error loading data</td></tr>',
      );
    },
  });
}

// =============================================
// Notification System
// =============================================

function showNotification(type, message, title, options) {
  const defaults = {
    autohide: true,
    delay: 5000,
    position: "top-right",
  };

  const settings = $.extend({}, defaults, options);
  const toastId = "toast-" + Date.now();

  const iconClass =
    {
      success: "fas fa-check-circle text-success",
      error: "fas fa-exclamation-circle text-danger",
      warning: "fas fa-exclamation-triangle text-warning",
      info: "fas fa-info-circle text-info",
    }[type] || "fas fa-info-circle";

  const toastHtml = `
        <div id="${toastId}" class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="${settings.autohide}" data-bs-delay="${settings.delay}">
            <div class="toast-header">
                <i class="${iconClass} me-2"></i>
                <strong class="me-auto">${title || "Notification"}</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                ${message}
            </div>
        </div>
    `;

  $("#notification-container").append(toastHtml);
  $(`#${toastId}`).toast("show");

  // Remove toast element after it's hidden
  $(`#${toastId}`).on("hidden.bs.toast", function () {
    $(this).remove();
  });
}

function showAlert(type, message, container) {
  const alertClass =
    {
      success: "alert-success",
      error: "alert-danger",
      warning: "alert-warning",
      info: "alert-info",
    }[type] || "alert-info";

  const iconClass =
    {
      success: "fas fa-check-circle",
      error: "fas fa-exclamation-circle",
      warning: "fas fa-exclamation-triangle",
      info: "fas fa-info-circle",
    }[type] || "fas fa-info-circle";

  const alertHtml = `
        <div class="alert ${alertClass} alert-dismissible fade show" role="alert">
            <i class="${iconClass}"></i> ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;

  const targetContainer = container || $("main").first();
  targetContainer.prepend(alertHtml);

  // Auto-hide after 5 seconds
  setTimeout(function () {
    targetContainer
      .find(".alert")
      .first()
      .fadeOut("slow", function () {
        $(this).remove();
      });
  }, 5000);
}

// =============================================
// Loading Indicators
// =============================================

function showGlobalLoading() {
  if ($("#global-loading-overlay").length === 0) {
    $("body").append(`
            <div id="global-loading-overlay" class="position-fixed w-100 h-100 d-flex justify-content-center align-items-center" 
                 style="top:0;left:0;background:rgba(0,0,0,0.3);z-index:9998;">
                <div class="bg-white p-3 rounded shadow">
                    <div class="d-flex align-items-center">
                        <div class="spinner-border text-primary me-3" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                        <span>Processing...</span>
                    </div>
                </div>
            </div>
        `);
  }
}

function hideGlobalLoading() {
  $("#global-loading-overlay").remove();
}

function showLoading() {
  showGlobalLoading();
}

function hideLoading() {
  hideGlobalLoading();
}

function showElementLoading(element) {
  const $element = $(element);
  const originalContent = $element.html();

  $element.data("original-content", originalContent);
  $element.html('<i class="fas fa-spinner fa-spin"></i> Loading...');
}

function hideElementLoading(element) {
  const $element = $(element);
  const originalContent = $element.data("original-content");

  if (originalContent) {
    $element.html(originalContent);
    $element.removeData("original-content");
  }
}

// =============================================
// Error Handling
// =============================================

function handleGlobalAjaxError(xhr, status, error) {
  console.error("AJAX Error:", { xhr, status, error });

  if (xhr.status === 401) {
    showNotification(
      "warning",
      "Your session has expired. Please log in again.",
    );
    setTimeout(() => {
      window.location.href = "/Home/Login";
    }, 2000);
  } else if (xhr.status === 403) {
    showNotification(
      "error",
      "You do not have permission to perform this action.",
    );
  } else if (xhr.status === 404) {
    showNotification("error", "The requested resource was not found.");
  } else if (xhr.status >= 500) {
    showNotification(
      "error",
      "An internal server error occurred. Please try again later.",
    );
  } else if (status === "timeout") {
    showNotification(
      "warning",
      "Request timed out. Please check your connection and try again.",
    );
  }
}

function handleFormSuccess(response, form) {
  if (response.success) {
    showNotification(
      "success",
      response.message || "Operation completed successfully",
    );

    // Reset form if specified
    if (form.data("reset-on-success")) {
      form[0].reset();
    }

    // Redirect if specified
    if (response.redirectUrl) {
      setTimeout(() => {
        window.location.href = response.redirectUrl;
      }, 1000);
    }

    // Refresh specific elements if specified
    if (response.refreshTargets) {
      response.refreshTargets.forEach((target) => {
        $(target).trigger("refresh");
      });
    }
  } else {
    showNotification("error", response.message || "Operation failed");

    // Display validation errors
    if (response.errors) {
      displayValidationErrors(response.errors, form);
    }
  }
}

function handleFormError(xhr, form) {
  const response = xhr.responseJSON;

  if (response && response.errors) {
    displayValidationErrors(response.errors, form);
  } else {
    showNotification(
      "error",
      "An error occurred while processing your request",
    );
  }
}

function displayValidationErrors(errors, form) {
  // Clear existing errors
  form.find(".is-invalid").removeClass("is-invalid");
  form.find(".invalid-feedback").remove();

  // Add new errors
  Object.keys(errors).forEach((field) => {
    const input = form.find(`[name="${field}"]`);
    const messages = Array.isArray(errors[field])
      ? errors[field]
      : [errors[field]];

    input.addClass("is-invalid");

    const feedback = $(
      `<div class="invalid-feedback">${messages.join("<br>")}</div>`,
    );
    input.after(feedback);
  });
}

// =============================================
// Auto-refresh System
// =============================================

function startAutoRefresh() {
  // Auto-refresh elements with data-auto-refresh attribute
  $("[data-auto-refresh-interval]").each(function () {
    const element = $(this);
    const interval = parseInt(element.data("auto-refresh-interval"));
    const url = element.data("refresh-url");

    if (interval && url) {
      setInterval(() => {
        refreshElement("#" + element.attr("id"), url);
      }, interval);
    }
  });
}

// =============================================
// Utility Functions
// =============================================

function debounce(func, wait, immediate) {
  let timeout;
  return function executedFunction() {
    const context = this;
    const args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

function formatCurrency(amount, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(amount);
}

function formatDate(date, options = {}) {
  const defaults = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const settings = Object.assign({}, defaults, options);
  return new Intl.DateTimeFormat("en-US", settings).format(new Date(date));
}

function formatRelativeTime(date) {
  const now = new Date();
  const diffInMs = now - new Date(date);
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) {
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    if (diffInHours === 0) {
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
      return diffInMinutes + " minutes ago";
    }
    return diffInHours + " hours ago";
  } else if (diffInDays < 7) {
    return diffInDays + " days ago";
  } else {
    return formatDate(date);
  }
}

// =============================================
// Modal Content Initialization
// =============================================

function initializeModalContent(modal) {
  // Initialize form validation for modal forms
  modal.find("form").on("submit", function (e) {
    e.preventDefault();

    const form = $(this);
    const formData = new FormData(this);
    const url = form.attr("action");
    const method = form.attr("method") || "POST";

    $.ajax({
      url: url,
      type: method,
      data: formData,
      processData: false,
      contentType: false,
      success: function (response) {
        if (response.success) {
          modal.modal("hide");
          showNotification("success", response.message);

          // Trigger refresh on specified targets
          if (response.refreshTargets) {
            response.refreshTargets.forEach((target) => {
              $(target).trigger("refresh");
            });
          }
        } else {
          displayValidationErrors(response.errors || {}, form);
        }
      },
      error: function (xhr) {
        handleFormError(xhr, form);
      },
    });
  });

  // Initialize select2 or other plugins if needed
  modal.find("select.select2").select2({
    dropdownParent: modal,
  });

  // Initialize tooltips in modal
  modal.find('[data-bs-toggle="tooltip"]').tooltip();
}

// =============================================
// Export functions for global use
// =============================================

window.SkillGuide.utils = {
  showNotification,
  showAlert,
  showLoading,
  hideLoading,
  loadDashboardWidget,
  loadSelectOptions,
  loadTableData,
  refreshElement,
  debounce,
  formatCurrency,
  formatDate,
  formatRelativeTime,
};

// Make key functions globally available
window.showNotification = showNotification;
window.showAlert = showAlert;
window.showLoading = showLoading;
window.hideLoading = hideLoading;
window.refreshElement = refreshElement;
